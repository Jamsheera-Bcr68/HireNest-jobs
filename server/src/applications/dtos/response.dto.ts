import { JobCardDto } from './job.dto';
import { JobCountByIndustryDto } from './job.dto';

export type HomeResponseDto = {
  currentDayPostCount: number;
  industries: JobCountByIndustryDto[];
  featuredJobs: JobCardDto[];
  stats: { label: string; value: number }[];
};
