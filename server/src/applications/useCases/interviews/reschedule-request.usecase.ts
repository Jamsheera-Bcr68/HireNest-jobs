import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { InterviewStatusEnum } from '../../../domain/enums/status.enum';

export interface IRescheduleRequestUsecase {
  execute(
    interviewId: string,
    candidateId: string,
    reason: string
  ): Promise<void>;
}

export class RescheduleRequestUsecase implements IRescheduleRequestUsecase {
  constructor(private _interviewRepository: IInterviewRepository) {}

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
  }
}
