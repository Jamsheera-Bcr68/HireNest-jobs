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
import { Chatroom } from '../../../domain/entities/chatroom.entity';
import { IEmailService } from '../../interfaces/services/email.service';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { Interviewer } from '../../../domain/enums/interview.enum';

export interface IScheduleInterviewUsecase {
  execute(
    data: interviewInputDto
  ): Promise<{ chatroomId: string; interviewId: string }>;
}

export class ScheduleInterviewUsecase implements IScheduleInterviewUsecase {
  constructor(
    private _applicationRepository: IApplicationRepository,
    private _interviewRepository: IInterviewRepository,
    private _notificationService: INotificationService,
    private _companyRepository: ICompanyRepository,
    private _jobRepository: IJobRepository,
    private _chatroomRepository: IChatroomRepository,
    private _emailService: IEmailService,
    private _userRepository: IUserRepository
  ) {}
  async execute(
    data: interviewInputDto
  ): Promise<{ chatroomId: string; interviewId: string }> {
    const { applicationId } = data;

    const application =
      await this._applicationRepository.findById(applicationId);
    if (!application)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Application'),
        statusCodes.NOTFOUND
      );

    const interview = await this._interviewRepository.findOne({
      applicationId: application.id,
    });

    //if same round for this candidate is already completed
    if (
      interview &&
      interview.interviewerType == data.interviewerType &&
      interview.roundName === data.roundName
    ) {
      throw new AppError(
        generalMessages.errors.INTERVIEW_ALREADY_SCHEDULED(
          data.interviewerType === Interviewer.AI_AGENT ? 'AI ' : 'Human',
          data.roundName
        ),
        statusCodes.CONFLICT
      );
    }

    const {
      date,
      mode,
      location,
      notes,
      time,
      meetLink,
      duration,
      isAddlinkLater,
      interviewerType,
      topics,
      roundName,
    } = data;
    const updatedTopics = topics ? topics.split(',') : [];
    const scheduledAt = new Date(`${date}T${time}`);
    const doc = {
      mode,
      location,
      meetLink,
      duration,
      isAddlinkLater,
      notes,
      topics: updatedTopics,
      interviewerType,
      roundName,
      scheduledAt,
      jobId: application.jobId,
      candidateId: application.candidateId,
      companyId: application.companyId,
      applicationId,
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
    const candidate = await this._userRepository.findById(
      application.candidateId
    );
    if (!candidate) {
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );
    }

    const notificationData: NotificationInputDto = {
      userId: newInterview.candidateId,
      type: NotificationType.INTERVIEW_SCHEDULED,
      message: notificationMessages[NotificationType.INTERVIEW_SCHEDULED]({
        round: data.roundName,
        companyName: company.companyName,

        jobTitle: job.title,

        interviewDate: new Date(newInterview.scheduledAt).toDateString(),

        interviewTime: new Date(newInterview.scheduledAt).toLocaleTimeString(),
      }),
      title: 'Interview Shceduled',
    };

    // console.log('notification data',notificationData);
    let chatroom = await this._chatroomRepository.findOne({
      jobId: application.jobId,
      candidateId: application.candidateId,
    });

    if (!chatroom) {
      const chatroomData: ChatroomInputDto = {
        companyId: newInterview.companyId,
        candidateId: newInterview.candidateId,
        jobId: newInterview.jobId,
      };

      chatroom = await this._chatroomRepository.create(chatroomData);
    }
    if (!chatroom)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Chatroom'),
        statusCodes.NOTFOUND
      );
    const notification =
      await this._notificationService.create(notificationData);
    getIO().to(newInterview.candidateId).emit('notification', notification);
    const interviewTime = new Date(newInterview.scheduledAt).toLocaleTimeString(
      'en-IN',
      {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }
    );
    await this._emailService.sendInterviewScheduledEmail(
      candidate.email,
      candidate.name ?? 'Candidate',
      job.title,
      company.companyName,
      new Date(newInterview.scheduledAt).toLocaleString(),
      interviewTime,
      newInterview.mode
    );

    return { interviewId: newInterview.id, chatroomId: chatroom.id };
  }
}
