import { AdminDashboardReportedJob } from '../applications/dtos/job.dto';
import { UserRole } from './enums/user.enums';
import { IJobRepository } from './repository-interfaces/job-repository.interface';
import { AppError } from './errors/app-error';
import { statusCodes } from '../shared/enums/statuscodes';
import { generalMessages } from '../shared/constants/messages/general.messages';
import { json } from 'zod';
import { StatusEnum } from './enums/status.enum';

export interface IGetReportedJobsUsecase {
  execute(role: UserRole): Promise<AdminDashboardReportedJob[]>;
}

export class GetReportedJobsUsecase implements IGetReportedJobsUsecase {
  constructor(private _jobRepository: IJobRepository) {}

  async execute(role: UserRole): Promise<AdminDashboardReportedJob[]> {
    if (role !== UserRole.ADMIN)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );

    const jobs = await this._jobRepository.getReportedJobs({isReported:true}
     
    );
    console.log('reported jobs jobs',jobs);
    
    return jobs.map((j) => ({
      id: j.id,
      
      companyName: j.company,
      type: j.type,
      title: j.role,
      count: j.count
    }));
  }
}
