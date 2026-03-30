import { AppError } from '../../../domain/errors/AppError';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export interface ISaveJobUseCase {
  execute(jobId: string, userId: string): Promise<string[]>;
}
export class SaveJobUseCase implements ISaveJobUseCase {
  constructor(
    private jobRepository: IJobRepository,
    private userRepository: IUserRepository
  ) {}
  async execute(
    jobId: string,

    userId: string
  ): Promise<string[]> {
    const job = await this.jobRepository.findById(jobId);
    if (!job || !job.id)
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    if (user.savedJobs.includes(jobId)) {
      throw new AppError(
        jobMessages.error.JOB_ALREADY_SAVED,
        statusCodes.CONFLICT
      );
    }

    const updated = await this.userRepository.update(userId, {
      ...user,
      savedJobs: [...user.savedJobs, jobId],
    });
    console.log('updated', updated);
    if (!updated) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    return updated.savedJobs;
  }
}
