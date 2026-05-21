import { JobDto } from '../../dtos/job.dto';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { AppError } from '../../../domain/errors/app-error';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IJobRepository } from '../../../domain/repository-iInterfaces/job-repository.interface';
import { Job } from '../../../domain/entities/job.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { ICompanyRepository } from '../../../domain/repository-iInterfaces/company-repository.interface';
import { UserMapper } from '../../mappers/user.mapper';
import { ISkillRepository } from '../../../domain/repository-iInterfaces/skill-repository.interface';
export interface ICrateJobUseCase {
  execute(payload: JobDto, userId: string, role: UserRole): Promise<Job>;
}

export class CrateJobUseCase implements ICrateJobUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jobRepository: IJobRepository,
    private comapanyRepository: ICompanyRepository,
    private skillRepository: ISkillRepository
  ) {}
  async execute(payload: JobDto, userId: string, role: UserRole): Promise<Job> {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    const company = await this.comapanyRepository.findOne({ userId: userId });
    if (!company || !company.id)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    const { skills } = payload;
    const postCount = await this.skillRepository.updatePostUsedCount(
      skills,
      'add'
    );
    const newJob = await this.jobRepository.create({
      ...payload,
      companyId: company.id,
    });
    return newJob;
  }
}
