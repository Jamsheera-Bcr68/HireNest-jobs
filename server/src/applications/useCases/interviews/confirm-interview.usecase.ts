import { InterviewStatusEnum } from '../../../domain/enums/status.enum';
import { AppError } from '../../../domain/errors/app-error';
import { IInterviewRepository } from '../../../domain/repository-iInterfaces/interview.repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

export interface IConfirmInterviewUsecase {
  execute(candidateId: string, interviewId: string): Promise<void>;
}

export class ConfirmInterviewUsecase implements IConfirmInterviewUsecase {
  constructor(private _interviewRepository: IInterviewRepository) {}

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
    console.log(updated);
  }
}
