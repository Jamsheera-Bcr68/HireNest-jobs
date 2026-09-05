import { InterviewStatusEnum } from '../../domain/enums/status.enum';
import { IndustryType } from '../../domain/types/company-profile.types';
import { PendingCompany } from '../dtos/company.dto';
import { AdminDashboardReportedJob } from '../dtos/job.dto';

export interface AdminDashboardCardsDto {
  totalActiveJobs: {
    count: number;
    changePercentage: number;
    isPositive: boolean;
  };
  pendingApprovals: {
    count: number;
  };
  verifiedCompanies: {
    count: number;
    changePercentage: number;
    isPositive: boolean;
  };
  registeredSeekers: {
    count: number;
    changePercentage: number;
    isPositive: boolean;
  };
}

export interface AdminCompanyJobChartDto {
  month: string;
  jobs: number;
  companies: number;
}
export const monthNames = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export interface UserDistributionChartData {
  role: string;
  value: number;
}
export interface ApplcationDistributionChartData {
  industry: IndustryType;
  count: number;
}
export interface InterviewData {
  status: string;
  value: number;
  count: number;
}

export interface DashboardPendingsDto {
  companies: PendingCompany[];
  jobs: AdminDashboardReportedJob[];
  
companyCount:number
jobCount:number
}
