import { InterviewMode } from '../../domain/enums/interview.enum';
import {
  ApplicationStatusEnum,
  StatusEnum,
} from '../../domain/enums/status.enum';
import { JobType } from '../../domain/types/job.types';

export type CompanyDashboardCardsDto = {
  activeJobs: {
    value: number;
    change: number;
    isPositive: boolean;
    currentMonthJobCount: number;
    jobExpiringSoon: number;
  };
  applications: {
    value: number;
    change: number;
    isPositive: boolean;
    newApplicaions: number;
  };
  interviews: {
    value: number;
    rescheuleRequested: number;
    nextInterview: string | null;
  };
  notifications: {
    new: number;
  };
  skills: {
    total: number;
    approved: number;
  };
  profile: {
    completion: number;
    remainingSections: number;
  };
};

export interface CompanyDashboardAppData {
  chartData: CompanyApplicationChartData[];
  appStatusData: CompanyApplicationStatusData[];
  latestApplications: DashboardApplication[];
}
export interface CompanyApplicationChartData {
  month: string;
  applicationCount: number;
  hired: number;
}

export interface CompanyApplicationStatusData {
  stage: ApplicationStatusEnum;
  count: number;
}

export interface DashboardApplication {
  id: string;

  name: string;
  role: string;
  appliedAt: string;
  status: ApplicationStatusEnum;
  imageUrl: string;
}

export interface CompanyDashboardJobData {
  topJobs: TopJob[];
  activeJobs: DashboardActiveJobType[];
}

export interface TopJob {
  title: string;
  applicants: number;
}

export interface DashboardJobData {
  topJobs: TopJob[];
  activeJobs: DashboardActiveJobType[];
}

export interface DashboardInterview {
  id: string;
  name: string;
  role: string;
  time: string;
  date: string;
  type: InterviewMode;
  imageUrl: string;
}

export type DashboardActiveJobType = {
  id: string;
  title: string;
  type: JobType;
  location: string;
  applicants: number;

  status: StatusEnum;
};

type RecentItemType = 'job' | 'application' | 'interview';

export interface RecentActivityDto {
  id: string;
  type: 'job_published' | 'application_received' | 'interview_scheduled';
  item: RecentItemType;
  message: string;
  title: string;
  time: string;
}

export type PendingActionItem = 'reschedule'|'new-apps'|'closing-jobs'|'shortlisted'|'confirmed-interview';
export interface PendingActivityDto {
  item: PendingActionItem;
  desc: string;
  title: string;
 
}
