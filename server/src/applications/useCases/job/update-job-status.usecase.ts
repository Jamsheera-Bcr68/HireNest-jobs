import { Job } from '../../../domain/entities/job.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-iInterfaces/company-repository.interface';
import { IJobRepository } from '../../../domain/repository-iInterfaces/job-repository.interface';
import { ISkillRepository } from '../../../domain/repository-iInterfaces/skill-repository.interface';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { jobMessages } from '../../../shared/constants/messages/job.messages';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

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
