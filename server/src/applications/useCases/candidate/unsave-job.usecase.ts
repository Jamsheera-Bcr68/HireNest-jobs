import { AppError } from '../../../domain/errors/AppError';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export interface IRemoveSavedJobUseCase {
  execute(jobId: string, userId: string): Promise<void>;
}
export class RemoveSavedJobUseCase implements IRemoveSavedJobUseCase {
  constructor(
    private jobRepository: IJobRepository,
    private userRepository: IUserRepository
  ) {}
  async execute(
    jobId: string,

    userId: string
  ): Promise<void> {
    const job = await this.jobRepository.findById(jobId);
    if (!job || !job.id)
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    if (!user.savedJobs.includes(jobId)) {
      throw new AppError(
        jobMessages.error.JOB_ALREADY_UNSAVED,
        statusCodes.CONFLICT
      );
    }

    const updated = await this.userRepository.removeSavedJob(userId, jobId);
    if (!updated) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    console.log('updated', updated.savedJobs);
  }
}
