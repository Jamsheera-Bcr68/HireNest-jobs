import { Application } from 'express';
import { ApplicationStatusEnum } from '../../domain/enums/status.enum';
import { Job } from '../../domain/entities/job.entity';
import { Company } from '../../domain/entities/company.entity';
import { JobType } from '../../domain/types/job.types';
import { WorkMode } from '../../domain/enums/work-mode.enum';
import { IndustryType } from '../../domain/types/company-profile.types';
import { UserSkillDto } from './skill.dto';
import { IAddress, IResume } from '../../domain/values/profile-types';
import { EducationStatus } from '../../domain/enums/education.enum';

export interface ApplicationDto {
  id: string;

  jobTitle: string;
  company: string;
  location: string;
  workMode: string;
  jobType: string;
  category: string;
  status: ApplicationStatusEnum;
  appliedDate: string;
  logo: string;
  applicant?: {
    name?: string;
    email?: string;
    location?: string;
  };
}

export type ApplicationListDto = {
  applications: ApplicationDto[];
  totalDocs: number;
};

export type AggregatedApplication = {
  id: string;
  state: string;
  country: string;
  type: JobType;
  jobTitle: string;
  appliedAt: Date;
  company: string;
  mode: WorkMode;
  category: IndustryType;
  status: ApplicationStatusEnum;
  logo: string;

  applicant:{
    name:string,
    email:string,
    address:IAddress
    imageUrl:string
  }
};

export type ApplicationStatsCardType = {
  total: number;
  shortListed: number;
  rejected: number;
  pending: number;
  interviewScheduled: number;
};

export type ApplicationFilterDto = {
  candidateId?: string;
  companyId?: string;
  jobId?: string;
  search?: string;
  status?: ApplicationStatusEnum;
  page?: number;
  limit?: number;
  sortBy?: string;
  jobType?: JobType;
  startDate?:Date
  endDate?:Date
};
export type TimelineStatus = 'done' | 'active' | 'pending';

export interface ApplicationTimelineItemDTO {
  stage: string;
  status: TimelineStatus;
  date?: string;
  note?: string;
}

export type ApplicationDetailsDto = {
  id: string;
  status: ApplicationStatusEnum;
  resume: IResume;

  appliedAt: string;
  reviewedAt?: string;
  shortlistedAt?: string;
  interviewAt?: string;
  offeredAt?: string;
  timeline: ApplicationTimelineItemDTO[];

  candidate: {
    about: string;
    profileImg?: string;
    candidateName: string;
    role: string;
    email: string;

    phone: string;
    location: string;
    experience: {
      role: string;
      mode: WorkMode;
      isWorking: boolean;
      startYear: string;
      endYear?: string;
      company: string;
    }[];
    education: {
      level: string;
      institute: string;
      status: EducationStatus;
      year?: number;
      univercity: string;
    }[];
  };
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
