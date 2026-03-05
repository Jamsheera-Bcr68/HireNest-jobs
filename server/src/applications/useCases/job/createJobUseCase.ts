import { jobDto } from '../../Dtos/jobDto';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { AppError } from '../../../domain/errors/AppError';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { Job } from '../../../domain/entities/Job';
export interface ICrateJobUseCase {
  execute(payload: jobDto, userId: string): Promise<Job>;
}

export class CrateJobUseCase implements ICrateJobUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jobRepository: IJobRepository
  ) {}
  async execute(payload: jobDto, userId: string): Promise<Job> {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    const newJob = await this.jobRepository.create(payload);
    return newJob;
  }
}
