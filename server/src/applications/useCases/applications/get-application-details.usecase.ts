import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IApplicationRepository } from '../../../domain/repositoriesInterfaces/application.repository.interface';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { ApplicationDetailsDto } from '../../Dtos/application.dto';
import { IGetEntityDetailsUsecase } from '../../interfaces/usecases/get-entity-details.usecase.inerface';
import { ApplicationMapper } from '../../mappers/application.mapper';
import { IExperienseRepository } from '../../../domain/repositoriesInterfaces/IExperienceRepository';

export class GetApplicationDetailUsecase implements IGetEntityDetailsUsecase<ApplicationDetailsDto> {
  constructor(
    private _applicationRepository: IApplicationRepository,
    private _jobRepository: IJobRepository,
    private _companyRepository: ICompanyRepository,
    private _userRepository: IUserRepository,
    private _skillRepository: ISkillRepository
  ) {}
  async execute(
    id: string,
    userId: string,
    role: string
  ): Promise<ApplicationDetailsDto> {
    const application = await this._applicationRepository.findById(id);
    if (!application)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Application'),
        statusCodes.NOTFOUND
      );
    const job = await this._jobRepository.findById(application.jobId);
    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );
    const company = await this._companyRepository.findById(job.companyId);
    if (!company)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );

    const candidateId =
      role === UserRole.CANDIDATE ? userId : application.candidateId;

    const candidate = await this._userRepository.findById(candidateId);

    if (!candidate)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );
    const resume = candidate.resumes.find((r) => r.id == application.resumeId);
    if (!resume)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Resume'),
        statusCodes.NOTFOUND
      );

    const skills = await this._skillRepository.findByIds(job.skills);
    return ApplicationMapper.toApplicationDetailDto(
      application,
      job,
      company,
      candidate,
      skills,
      resume
    );
  }
}
