import type { JobCardDto } from './jobDto';
import type { IndustryType } from './profileTypes/industryType';

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
