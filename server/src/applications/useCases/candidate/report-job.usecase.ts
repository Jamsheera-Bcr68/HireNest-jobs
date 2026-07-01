import { AppError } from '../../../domain/errors/app-error';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { jobMessages } from '../../../shared/constants/messages/job.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { type ReportJobInputDto } from '../../dtos/job.dto';

export interface IReportJobUseCase {
  execute(id: string, data: ReportJobInputDto, userId: string): Promise<void>;
}
export class ReportJobUseCase implements IReportJobUseCase {
  constructor(private jobRepository: IJobRepository) {}
  async execute(
    id: string,
    data: ReportJobInputDto,
    userId: string
  ): Promise<void> {
    const job = await this.jobRepository.findById(id);
    if (!job || !job.id)
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);
    const isReported = job.reportDetails.find(
      (report) => report.reportedBy === userId
    );
    if (isReported) {
      throw new AppError(
        jobMessages.error.USER_ALREADY_REPORTED,
        statusCodes.CONFLICT
      );
    }
    const updated = await this.jobRepository.update(id, {
      ...job,
      isReported: true,
      reportDetails: [...job.reportDetails, { ...data, reportedBy: userId }],
    });
  //  console.log('updated', updated);
  }
}
