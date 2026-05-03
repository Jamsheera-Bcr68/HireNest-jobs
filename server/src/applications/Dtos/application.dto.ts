import { Application } from 'express';
import { ApplicationStatusEnum } from '../../domain/enums/statusEnum';
import { Job } from '../../domain/entities/Job';
import { Company } from '../../domain/entities/company';
import { JobType } from '../../domain/types/jobTypes';
import { WorkMode } from '../../domain/enums/WorkMode';
import { IndustryType } from '../../domain/types/companyProfileTypes';
import { UserSkillDto } from './skillDto';
import { IResume } from '../../domain/values/profileTypes';
import { EducationStatus } from '../../domain/enums/EducationEnum';

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
};

export type ApplicationStatsCardType = {
  total: number;
  shortListed: number;
  rejected: number;
  pending: number;
  interviewScheduled: number;
};

export type ApplicationFilterDto = {
  candidateId: string;
  search?: string;
  status?: ApplicationStatusEnum;
  page?: number;
  limit?: number;
  sortBy?: string;
  jobType?: JobType;
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
