import type { JobType } from './jobDto';
import type { WorkMode } from './profileTypes/experienceType';
import type { IndustryType } from './profileTypes/industryType';
import type { ResumeType } from './profileTypes/ResumeType';

export type ApplicationStatusType =
  | 'pending'
  | 'reviewed'
  | 'shortListed'
  | 'rejected'
  | 'interviewSheduled'
  | 'withdrawn';

export type ApplicationDto = {
  id: string;

  jobTitle: string;
  company: string;
  location: string;
  workMode: string;
  jobType: string;
  category: string;
  status: ApplicationStatusType;
  appliedDate: string;
  logo: string;
};


export type ExpType = {};
export type ApplicationDetailsDto = {
  id: string;
  status: ApplicationStatusType;
  resume: ResumeType;

  appliedAt: string;
  reviewedAt?: string;
  shortlistedAt?: string;
  interviewAt?: string;
  offeredAt?: string;
  timeline: { stage: string; date: string; status: string }[];

  candidate: {
    about?: string;
    profileImg?: string;
    candidateName: string;
    role: string;
    email: string;
    resumes: ResumeType[];
    phone: string;
    location: string;
    experience: {
      role: string;
      mode: WorkMode;
      isWorking: boolean;
      company: string;
      startYear: string;
      endYear: string;
    }[];
    education: {
      level: string;
      institute: string;
      univercity: string;
      status: string;
      year: string;
    }[];
  }
  job: {
    id: string;
    title: string;
    location: string;
    jobType: JobType;
    mode: WorkMode;
    experience: string;
    skills: string[];

    min_salary: number;
    max_salary: number;
    postedDate: string;
  };
  company: {
    id: string;
    companyName: string;
    industry: IndustryType;
    location: string;
    size: string;
    logoUrl: string;
  };
};

export const APP_STATUS_ORDER: ApplicationStatusType[] = [
  'pending',
  'reviewed',
  'shortListed',
  'interviewSheduled',

  'rejected',
];
