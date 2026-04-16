import { JobDto } from '../../Dtos/jobDto';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { AppError } from '../../../domain/errors/AppError';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { Job } from '../../../domain/entities/Job';
import { UserRole } from '../../../domain/enums/userEnums';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { UserMapper } from '../../mappers/userMapper';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
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
