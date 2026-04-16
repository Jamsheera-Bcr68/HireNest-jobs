import { Application } from '../../../domain/entities/application';
import { ApplicationStatusEnum } from '../../../domain/enums/statusEnum';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IApplicationRepository } from '../../../domain/repositoriesInterfaces/application.repository.interface';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { applicationMessage } from '../../../shared/constants/messages/application.messages';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export interface IApplyJobUseCase {
  execute(jobId: string, userId: string, role: UserRole): Promise<String>;
}
export class ApplyJobUseCase implements IApplyJobUseCase {
  constructor(
    private applicationRepository: IApplicationRepository,
    private userRepository: IUserRepository,
    private jobRepository: IJobRepository
  ) {}

  async execute(
    jobId: string,
    userId: string,
    role: UserRole
  ): Promise<String> {
    const job = await this.jobRepository.findById(jobId);
    if (!job || !job.id)
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);

    const user = await this.userRepository.findById(userId);
    if (!user || !user.id)
      throw new AppError(
        authMessages.error.USER_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    if (role !== user.role)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const isApplied = await this.applicationRepository.findByUserIdAndJobId(
      userId,
      jobId
    );
    const newDoc: Partial<Application> = {
      jobId,
      companyId: job.companyId,
      candidateId: userId,
      status: ApplicationStatusEnum.PENDING,
    };
    if (isApplied) {
      console.log('this.job already applied');
      throw new AppError(
        applicationMessage.error.ALREADY_APPLIED,
        statusCodes.CONFLICT
      );
    }

    // const appliedCount=await this.applicationRepository.count({candidateId:userId,appliedAt:new Date().toString()})
    // if(appliedCount>2){
    //   throw new AppError('You cannot apply more than 2 jobs in  day',statusCodes.BADREQUEST)
    // }
    const application = await this.applicationRepository.create(newDoc);
    return application.id;
  }
}
