import { InterviewStatusEnum } from '../../../domain/enums/status.enum';
import { AppError } from '../../../domain/errors/app-error';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { INotificationService } from '../../services/notification.service';
import { Notification } from '../../../domain/entities/notification.entity';
import { NotificationType } from '../../../domain/enums/notification-enums';
import { notificationMessages } from '../../../shared/constants/messages/notification.messages';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';

export interface IConfirmInterviewUsecase {
  execute(candidateId: string, interviewId: string): Promise<void>;
}

export class ConfirmInterviewUsecase implements IConfirmInterviewUsecase {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _notificationService: INotificationService,
    private _jobRepository: IJobRepository,
    private _userRepsository: IUserRepository
  ) {}

  async execute(candidateId: string, interviewId: string): Promise<void> {
    const interview = await this._interviewRepository.findById(interviewId);

    if (!interview)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );
    if (interview.candidateId !== candidateId)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    if (interview.status !== InterviewStatusEnum.SCHEDULED)
      throw new AppError(
        generalMessages.errors.INTERVIEW_NOT_SCHEDULED,
        statusCodes.BADREQUEST
      );
    if (interview.isConfirmed) {
      throw new AppError(
        generalMessages.errors.ALREADY_CONFIRMED,
        statusCodes.BADREQUEST
      );
    }
    const updated = await this._interviewRepository.save(interview.id, {
      isConfirmed: true,
    });
    const job = await this._jobRepository.findById(interview.jobId);
    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );
    const candidate = await this._userRepsository.findById(
      interview.candidateId
    );
    if (!candidate)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );

    const notificationData: Partial<Notification> = {
      userId: interview.companyId,
      type: NotificationType.INTERVIEW_CONFIRMED,
      message: notificationMessages[NotificationType.INTERVIEW_CONFIRMED]({
        name: candidate.name || '',
        jobTitle: job.title,
      }),
      title: 'Interview Confirmed',
    };

    console.log(updated);
    await this._notificationService.create(notificationData)
  }
}
