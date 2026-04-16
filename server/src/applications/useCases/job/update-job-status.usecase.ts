import { Job } from '../../../domain/entities/Job';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export interface IUpdateJobStatusUseCase {
  execute(
    jobId: string,
    userId: string,
    role: UserRole,
    data: Partial<Job>
  ): Promise<void>;
}

export class UpdateJobStatusUseCase implements IUpdateJobStatusUseCase {
  constructor(
    private jobRepository: IJobRepository,
    private companyRepository: ICompanyRepository,
    private skillRepository: ISkillRepository
  ) {}
  async execute(
    jobId: string,
    userId: string,
    role: UserRole,
    data: Partial<Job>
  ): Promise<void> {
    //console.log('from usecase', jobId, userId, role, data);

    const job = await this.jobRepository.findById(jobId);
    if (!job || !job.id)
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);

    if (role === UserRole.COMPANY) {
      const company = await this.companyRepository.findByUserId(userId);
      if (!company)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      if (job.companyId !== company.id)
        throw new AppError(
          userMessages.error.COMPANY_NOT_FOUND,
          statusCodes.NOTFOUND
        );
    } else if (role !== UserRole.ADMIN) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }
    const { status } = data;
    if (status === 'removed') {
      const skills = job.skills;
      await this.skillRepository.updatePostUsedCount(skills, 'remove');
    }
    await this.jobRepository.update(jobId, data);
  }
}
