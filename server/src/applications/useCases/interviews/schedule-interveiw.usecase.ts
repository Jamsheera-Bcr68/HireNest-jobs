import { Notification } from '../../../domain/entities/notification.entity';
import { AppError } from '../../../domain/errors/app-error';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { interviewInputDto, interviewDto } from '../../dtos/interview.dto';
import { Interview } from '../../../domain/entities/interview.entity';
import {
  ApplicationStatusEnum,
  InterviewStatusEnum,
} from '../../../domain/enums/status.enum';
import { INotificationService } from '../../services/notification.service';
import { NotificationType } from '../../../domain/enums/notification-enums';
import { notificationMessages } from '../../../shared/constants/messages/notification.messages';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { NotificationInputDto } from '../../dtos/notification.dto';
import { getIO } from '../../../infrastructure/socket';
import { IChatroomRepository } from '../../../domain/repository-interfaces/chatroom.repository.interface';
import { ChatroomInputDto } from '../../dtos/chatroom.dto';

export interface IScheduleInterviewUsecase {
  execute(data: interviewInputDto): Promise<string>;
}

export class ScheduleInterviewUsecase implements IScheduleInterviewUsecase {
  constructor(
    private _applicationRepository: IApplicationRepository,
    private _interviewRepository: IInterviewRepository,
    private _notificationService: INotificationService,
    private _companyRepository: ICompanyRepository,
    private _jobRepository: IJobRepository,
    private _chatroomRepository: IChatroomRepository
  ) {}
  async execute(data: interviewInputDto): Promise<string> {
    const { applicationId } = data;

    const application =
      await this._applicationRepository.findById(applicationId);
    if (!application)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Application'),
        statusCodes.NOTFOUND
      );

    const {
      date,
      mode,
      location,
      notes,
      time,
      meetLink,
      duration,
      isAddlinkLater,
    } = data;

    const scheduledAt = new Date(`${date}T${time}`);
    const doc = {
      mode: mode,
      location: location,
      meetLink: meetLink,
      duration: duration,
      isAddlinkLater: isAddlinkLater,
      notes,
      scheduledAt,
      jobId: application.jobId,
      candidateId: application.candidateId,
      companyId: application.companyId,
      applicationId: applicationId,
      status: InterviewStatusEnum.SCHEDULED,
    };

    const newInterview = await this._interviewRepository.create(
      doc as Partial<Interview>
    );
    await this._applicationRepository.update(applicationId, {
      status: ApplicationStatusEnum.INTERVIEW_SCHEDULED,
    });
    const company = await this._companyRepository.findById(
      newInterview.companyId
    );
    if (!company)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );
    const job = await this._jobRepository.findById(newInterview.jobId);
    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );

    const notificationData: NotificationInputDto = {
      userId: newInterview.candidateId,
      type: NotificationType.INTERVIEW_SCHEDULED,
      message: notificationMessages[NotificationType.INTERVIEW_SCHEDULED]({
        companyName: company.companyName,

        jobTitle: job.title,

        interviewDate: new Date(newInterview.scheduledAt).toDateString(),

        interviewTime: new Date(newInterview.scheduledAt).toLocaleTimeString(),
      }),
      title: 'Interview Shceduled',
    };

    // console.log('notification data',notificationData);
    const chatroomExist = await this._chatroomRepository.findOne({
      jobId: newInterview.jobId,
      candidateId: newInterview.candidateId,
    });
    if (!chatroomExist) {
      const chatroomData: ChatroomInputDto = {
        companyId: newInterview.companyId,
        candidateId: newInterview.candidateId,
        jobId: newInterview.jobId,
      };

      await this._chatroomRepository.create(chatroomData);
    }

    const notification =
      await this._notificationService.create(notificationData);
    getIO().to(newInterview.candidateId).emit('notification', notification);
    return newInterview.id;
  }
}
