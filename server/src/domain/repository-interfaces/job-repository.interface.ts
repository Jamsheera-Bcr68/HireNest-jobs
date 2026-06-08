import { Job } from '../entities/job.entity';
import { IBaseRepository } from './base-repository.interface';
import {
  JobCountByIndustryDto,
  JobCardDto,
  JobFilter,
  JobListDto,
} from '../../applications/dtos/job.dto';

export interface IJobRepository extends IBaseRepository<Job> {
  count(data: Partial<Job>, filter?: string): Promise<number>;
  industryBasedJobs(): Promise<JobCountByIndustryDto[]>;
  getJobs(
    filter: JobFilter,
    limit: number,
    page: number,
    search?: { job: string; location: string },
    sortBy?: string
  ): Promise<JobListDto>;
  getSavedJobs(
    savedJobIds: string[],
    filter: JobFilter,
    limit: number,
    page: number,
    search?: { job?: string; location?: string },
    sortBy?: string
  ): Promise<JobCardDto[]>;
  getCountBySkill(skillId: string): Promise<number>;

  handleExpiredJobs():Promise<void>
}
