import type { JobCardDto } from './job.dto';
import type { IndustryType } from './profile-types/industry.type';

export type JobCountByIndustryDto = {
  industry: IndustryType;
  count: number;
};

export type HomeResponseDto = {
  currentDayPostCount: number;
  industries: JobCountByIndustryDto[];
  featuredJobs: JobCardDto[];
  stats: { label: string; value: number }[];
};
