import { Interview } from '../../../domain/entities/interview.entity';
import { NotificationType } from '../../../domain/enums/notification-enums';
import { InterviewStatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { getIO } from '../../../infrastructure/socket';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { notificationMessages } from '../../../shared/constants/messages/notification.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { NotificationInputDto } from '../../dtos/notification.dto';
import { IUpdateEntityStatusUseCase } from '../../interfaces/usecases/update-entity-status.usecase.interface';
import { INotificationService } from '../../services/notification.service';

export class UpdateInterviewStatusUsecase implements IUpdateEntityStatusUseCase<
  Interview,
  InterviewStatusEnum
> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository,
    private _notificationService: INotificationService,
    private _jobRepository: IJobRepository
  ) {}

  async execute(
    id: string,
    userId: string,
    role: UserRole,
    status: InterviewStatusEnum,
    reason?: string
  ): Promise<void | Interview> {
    console.log(
      'id,userId,role,status,reason',
      id,
      userId,
      role,
      status,
      reason
    );

    const interview = await this._interviewRepository.findById(id);
    if (!interview)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );

    if (role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
      if (!company)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company'),
          statusCodes.NOTFOUND
        );
      if (company.id !== interview.companyId)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
    }
    const data: Partial<Interview> = {};
    data.status = status;
    if (status == 'cancelled') {
      data.reasonForCancel = reason;
      data.cancelledBy = role;
    }
    const updated = await this._interviewRepository.update(id, data);

    const job = await this._jobRepository.findById(interview.jobId);
    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );
    const notificationData: NotificationInputDto = {
      type: NotificationType.INTERVIEW_UPDATED,
      title: `Interview ${status}`,
      message: notificationMessages[NotificationType.INTERVIEW_STATUS_UPDATED]({
        title: job.title,
        status,
      }),
      userId: interview.candidateId,
    };

    await this._notificationService.create(notificationData);

    getIO().to(notificationData.userId).emit('notification', notificationData);
  }
}
