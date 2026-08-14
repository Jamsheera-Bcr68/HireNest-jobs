import { IGetEntityDetailsUsecase } from '../../interfaces/usecases/get-entity-details.usecase.inerface';
import { MeetingDto } from '../../dtos/meeting.dto';
import { IInterviewDocument } from '../../../infrastructure/database/models/interview.model';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';

export class GetInterviewByMeetingIdUsecase implements IGetEntityDetailsUsecase<MeetingDto> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository,
    private _userRepository: IUserRepository,
    private _jobRepository: IJobRepository
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
    const company = await this._companyRepository.findById(interview.companyId);
    if (!company || !company.id)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );
    const candidate = await this._userRepository.findById(
      interview.candidateId
    );
    if (!candidate || !candidate.id)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );

    if (role == UserRole.COMPANY) {
      if (userId!==company.userId)
        throw new AppError(
          generalMessages.errors.FORBIDDEN,
          statusCodes.FORBIDDEN
        );
    } else {
      if (userId!== candidate.id) {
        throw new AppError(
          generalMessages.errors.FORBIDDEN,
          statusCodes.FORBIDDEN
        );
      }
    }
    const job = await this._jobRepository.findById(interview.jobId);
    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );

    return {
      meetingId: interview.meetLink,
      interviewId: interview.id,
      roleTitle: job.title,
      candidateName: candidate.name ?? '',
      companyName: company.companyName,
      scheduledAt: interview.scheduledAt.toString(),
      companyId: interview.companyId,
      candidateId: interview.candidateId,
      jobId: interview.jobId,
    };
  }
}
