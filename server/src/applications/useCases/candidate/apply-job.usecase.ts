import { Application } from '../../../domain/entities/application.entity';
import { ApplicationStatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { applicationMessage } from '../../../shared/constants/messages/application.messages';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { jobMessages } from '../../../shared/constants/messages/job.messages';
import { Notification } from '../../../domain/entities/notification.entity';
import { NotificationType } from '../../../domain/enums/notification-enums';
import { notificationMessages } from '../../../shared/constants/messages/notification.messages';

import { statusCodes } from '../../../shared/enums/statuscodes';
import { INotificationService } from '../../services/notification.service';
import { getIO } from '../../../infrastructure/socket';

export interface IApplyJobUseCase {
  execute(
    jobId: string,
    resumeId: string,
    userId: string,
    role: UserRole
  ): Promise<String>;
}

export class ApplyJobUseCase implements IApplyJobUseCase {
  constructor(
    private applicationRepository: IApplicationRepository,
    private userRepository: IUserRepository,
    private jobRepository: IJobRepository,
    private _notificationService: INotificationService
  ) {}

  async execute(
    jobId: string,
    resumeId: string,
    userId: string,
    role: UserRole
  ): Promise<String> {
    const job = await this.jobRepository.findById(jobId);
    if (!job || !job.id)
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);

    const user = await this.userRepository.findById(userId);
    if (!user || !user.id)
      throw new AppError(
        authMessages.error.USER_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    if (role !== user.role)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const resume = user.resumes.find((r) => r.id == resumeId);
    if (!resume)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Resume'),
        statusCodes.NOTFOUND
      );
    const isApplied = await this.applicationRepository.findByUserIdAndJobId(
      userId,
      jobId
    );
    const newDoc: Partial<Application> = {
      jobId,
      companyId: job.companyId,
      candidateId: userId,
      resumeId: resumeId,
      status: ApplicationStatusEnum.PENDING,
    };
    if (isApplied) {
    //  console.log('this.job already applied');
      throw new AppError(
        applicationMessage.error.ALREADY_APPLIED,
        statusCodes.CONFLICT
      );
    }

    const application = await this.applicationRepository.create(newDoc);

    const notificationData: Partial<Notification> = {
      userId: application.companyId,
      type: NotificationType.JOB_APPLIED,
      message: notificationMessages[NotificationType.JOB_APPLIED]({
        jobTitle: job.title,
      }),
      title: 'New Job Application Recieved',
    };

  const notification=  await this._notificationService.create(notificationData);
    getIO().to(application.companyId).emit('notification', notification);
    return application.id;
  }
}
