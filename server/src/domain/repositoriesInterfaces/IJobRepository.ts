import { Job } from '../entities/Job';
import { IBaseRepository } from './IBaseRepository';
import {
  JobCountByIndustryDto,
  JobCardDto,
  JobFilter,
} from '../../applications/Dtos/jobDto';

export interface IJobRepository extends IBaseRepository<Job> {
  count(data: Partial<Job>, filter?: string): Promise<number>;
  industryBasedJobs(): Promise<JobCountByIndustryDto[]>;
  getJobs(
    filter: JobFilter,
    limit: number,
    page: number,
    search?: { job: string; location: string },
    sortBy?: string
  ): Promise<JobCardDto[]>;
}
