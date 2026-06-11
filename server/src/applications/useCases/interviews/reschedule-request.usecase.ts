import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { InterviewStatusEnum } from '../../../domain/enums/status.enum';
import { INotificationService } from '../../services/notification.service';
import { NotificationInputDto } from '../../dtos/notification.dto';
import { NotificationType } from '../../../domain/enums/notification-enums';
import { notificationMessages } from '../../../shared/constants/messages/notification.messages';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { getIO } from '../../../infrastructure/socket';

export interface IRescheduleRequestUsecase {
  execute(
    interviewId: string,
    candidateId: string,
    reason: string
  ): Promise<void>;
}

export class RescheduleRequestUsecase implements IRescheduleRequestUsecase {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _notificationService: INotificationService,
    private _userRepository: IUserRepository,
    private _jobRepository: IJobRepository
  ) {}

  async execute(
    candidateId: string,
    interviewId: string,

    reason: string
  ): Promise<void> {
    const interview = await this._interviewRepository.findById(interviewId);
    if (!interview)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );
    if (interview.candidateId !== candidateId) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }

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

    if (interview.isRescheduleRequested) {
      throw new AppError(
        generalMessages.errors.ALREADY_REQUESTED_RESCHEDULE,
        statusCodes.CONFLICT
      );
    }
    await this._interviewRepository.save(interviewId, {
      isRescheduleRequested: true,
      reasonForRescheduleRequest: reason,
    });

    const candidate = await this._userRepository.findById(
      interview.candidateId
    );

    if (!candidate)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );
    const job = await this._jobRepository.findById(interview.jobId);

    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );
    const notificationData: NotificationInputDto = {
      type: NotificationType.RESCHEDULE_REQUESTED,
      title: NotificationType.RESCHEDULE_REQUESTED,
      userId: interview.companyId,
      message: notificationMessages['Reschedule Request Recieved']({
        candidateName: candidate.name ? candidate.name : 'Candidate',
        jobTitle: job.title,
      }),
    };

    await this._notificationService.create(notificationData);
    getIO().to(interview.companyId).emit('notification', notificationData);
  }
}
