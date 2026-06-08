import { AppError } from '../../../domain/errors/app-error';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { jobMessages } from '../../../shared/constants/messages/job.messages';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

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
