import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { ISkillRepository } from '../../../domain/repository-interfaces/skill-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { ApplicationDetailsDto } from '../../dtos/application.dto';
import { IGetEntityDetailsUsecase } from '../../interfaces/usecases/get-entity-details.usecase.inerface';
import { ApplicationMapper } from '../../mappers/application.mapper';
import { IExperienseRepository } from '../../../domain/repository-interfaces/experience-repository.interface';

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
