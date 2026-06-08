import { IGetEntityDetailsUsecase } from '../../interfaces/usecases/get-entity-details.usecase.inerface';
import { ApplicationDetailsDto } from '../../dtos/application.dto';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { interviewDetailDto } from '../../dtos/interview.dto';
import { AppError } from '../../../domain/errors/app-error';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { UserRole } from '../../../domain/enums/user.enums';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { InterviewMapper } from '../../mappers/interview.mapper';

export class GetInterviewDetailsUsecase implements IGetEntityDetailsUsecase<interviewDetailDto> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _jobRepository: IJobRepository,
    private _companyRepository: ICompanyRepository,
    private _userRepository: IUserRepository
  ) {}
  async execute(
    id: string,
    userId: string,
    role: string
  ): Promise<interviewDetailDto> {
    const interview = await this._interviewRepository.findById(id);

    if (!interview)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );
    const company = await this._companyRepository.findById(interview.companyId);

    if (!company)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );
    if (role == UserRole.COMPANY) {
      if (company.userId !== userId)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );

      if (interview.companyId !== company.id) {
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      }
    }
    const job = await this._jobRepository.findById(interview.jobId);
    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );
    const candidate = await this._userRepository.findById(
      interview.candidateId
    );
    if (!candidate)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );

    return InterviewMapper.toInterviewDetailDto(
      interview,
      job,
      candidate,
      company
    );
  }
}
