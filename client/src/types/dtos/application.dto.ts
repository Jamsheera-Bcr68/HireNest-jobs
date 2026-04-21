import type { JobType } from './jobDto';
import type { WorkMode } from './profileTypes/experienceType';
import type { IndustryType } from './profileTypes/industryType';
import type { ResumeType } from './profileTypes/ResumeType';


export type ApplicationStatusType =
  | 'pending'
  | 'viewed'
  | 'shortListed'
  | 'rejected'
  | 'interviewSheduled'|'withdrawn'

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

export type ApplicationDetailsDto = {
  id: string;
  status: ApplicationStatusType;
  resume: ResumeType;
  candidateName: string;
  role: string;
  email: string;
  resumes:ResumeType[]
  phone: string;
  appliedAt: string;
  reviewedAt?: string;
  shortlistedAt?: string;
  interviewAt?: string;
  offeredAt?: string;
  timeline: { stage: string; date: string; status: string }[];
  profileImg?:string,
  job: {
    id:string
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
    id:string
    companyName: string;
    industry: IndustryType;
    location: string;
    size: string;
    logoUrl: string;
  };
};
