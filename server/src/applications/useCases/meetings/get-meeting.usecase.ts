import { IGetEntityDetailsUsecase } from '../../interfaces/usecases/get-entity-details.usecase.inerface';
import { MeetingDto } from '../../dtos/meeting.dto';
import { IInterviewDocument } from '../../../infrastructure/database/models/interview.model';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';

export class GetInterviewByMeetingIdUsecase implements IGetEntityDetailsUsecase<MeetingDto> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository
  ) {}

  async execute(
    meetId: string,
    userId: string,
    role: UserRole
  ): Promise<MeetingDto> {
    const interview = await this._interviewRepository.findOne({
      meetLink: meetId,
    });
    if (!interview)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );

    if (role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
      if (!company || !company.id)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company'),
          statusCodes.NOTFOUND
        );
      if (interview.companyId !== company.id)
        throw new AppError(
          generalMessages.errors.FORBIDDEN,
          statusCodes.FORBIDDEN
        )
    } else {
      if (interview.candidateId !== userId) {
        throw new AppError(
          generalMessages.errors.FORBIDDEN,
          statusCodes.FORBIDDEN
        );
      }
    }

    return {
      meetingId: interview.meetLink,
      interviewId: interview.id,
      scheduledAt: interview.scheduledAt.toString(),
      companyId: interview.companyId,
      candidateId: interview.candidateId,
      jobId: interview.jobId,
    };
  }
}
