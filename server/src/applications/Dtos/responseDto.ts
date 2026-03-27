import { JobCardDto } from './jobDto';
import { JobCountByIndustryDto } from './jobDto';

export type HomeResponseDto = {
  currentDayPostCount: number;
  industries: JobCountByIndustryDto[];
  featuredJobs: JobCardDto[];
  stats: { label: string; value: number }[];
};
