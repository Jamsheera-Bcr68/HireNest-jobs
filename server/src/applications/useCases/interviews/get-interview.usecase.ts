import { IGetEntityDetailsUsecase } from '../../interfaces/usecases/get-entity-details.usecase.inerface';
import { ApplicationDetailsDto } from '../../Dtos/application.dto';
import { IInterviewRepository } from '../../../domain/repositoriesInterfaces/interview.repository.interface';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { interviewDetailDto } from '../../Dtos/interview.dto';
import { AppError } from '../../../domain/errors/AppError';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { UserRole } from '../../../domain/enums/userEnums';
import { authMessages } from '../../../shared/constants/messages/authMesages';
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

    if (role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);

      if (!company)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company'),
          statusCodes.NOTFOUND
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

    return InterviewMapper.toInterviewDetailDto(interview, job, candidate);
  }
}
