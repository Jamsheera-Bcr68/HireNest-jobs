import { UserSkillDto } from './skillDto';
import { ExperienceType, JobType } from '../../domain/types/jobTypes';
import { WorkMode } from '../../domain/enums/WorkMode';
import { StatusEnum } from '../../domain/enums/statusEnum';
import { Job } from '../../domain/entities/Job';
import {
  AddressType,
  IndustryType,
} from '../../domain/types/companyProfileTypes';
import { IAddress } from '../../domain/values/profileTypes';

export interface JobDto {
  title: string;
  companyId?: string;
  mode: WorkMode;
  jobType: JobType;
  vacancyCount: number;
  experience: ExperienceType;
  state: string;
  country: string;
  min_salary: number;
  max_salary: number;
  lastDate: Date;
  languages: string[] | [];
  status?: StatusEnum;
  education: string;
  responsibilities: string[] | [];
  skills: string[] | [];
  description: string;
}
export interface JobCardDto {
  companyLogo: string;
  companyname: string;
  location: AddressType;
  vacancyCount: number;
  title: string;
  id: string;
  mode: WorkMode;
  min_salary: string;
  jobType: JobType;
  skills: string[];
  max_salary: string;
  postedDate: Date;
  lastDate: Date;
  experience: ExperienceType;
}
export type JobDetailsDto = {
  id: string;
  title: string;
  mode: WorkMode;
  jobType: string;
  experience: ExperienceType;
  min_salary: number;
  max_salary: number;
  totalApplicants: number;
  createdAt: string;
  vacancyCount: number;
  description: string;
  responsibilities: string[];
  skills: string[];
  isReported: boolean;
  reportedBy: string[];

  companyName: string;
  companyLogo: string;
  industry: string;
  benefits: string[];
  aboutCompany: string;
  companySize: string;
  companyEmployeeCount: string;
  location: IAddress;
};
export type JobCountByIndustryDto = {
  industry: IndustryType;
  jobCount: number;
};

export type JobListDto = {
  jobs: JobCardDto[];
  totalDocs: number;
};

export type JobFilter = {
  datas?: Partial<Job>;
  jobType?: string;
  experience?: string;
  industry?: string;
  salary?: string[];
  mode?: string[];
};
export const SalaryRange = [
  { label: '₹0 - ₹10k', min_salary: 0, max_salary: 10000 },
  { label: '₹10k - ₹25k', min_salary: 10000, max_salary: 25000 },
  { label: '₹25k - ₹50k', min_salary: 25000, max_salary: 50000 },
  { label: '₹50k - ₹100k', min_salary: 50000, max_salary: 100000 },
  { label: '₹100k +', min_salary: 100000, max_salary: null },
];

export type ReportJobInputDto = {
  reason: string;
  info: string;
};
