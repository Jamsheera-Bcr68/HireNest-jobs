import { Job } from '../entities/job.entity';
import { chartDataDto } from '../types/chart.data.type';
import { IBaseRepository } from './base-repository.interface';
import {
  JobCountByIndustryDto,
  JobCardDto,
  JobFilter,
  JobCountFilter,
  JobListDto,
} from '../../applications/dtos/job.dto';
import { IndustryType } from '../types/company-profile.types';
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

  handleExpiredJobs(): Promise<void>;

  countBetweenTheDates(data: JobCountFilter): Promise<number>;
  getMonthlyJobCount(): Promise<chartDataDto[]>;
  postCountByIndustry(): Promise<{ _id: IndustryType; count: number }[]>;
  savedJobCount(jobs: string[],filter:Partial<Job>): Promise<number>;
}
