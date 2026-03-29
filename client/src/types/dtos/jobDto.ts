import { type WorkMode } from './profileTypes/experienceType';
import { Experience_Types } from './profileTypes/experienceType';

import type { StatusType } from './profileTypes/userTypes';
import { type AddressType } from '../profileTypes';
export const JOB_TYPES = ['partTime', 'fullTime'] as const;
export type JobDto = {
  title: string;
  companyId?: string;
  mode: WorkMode;
  jobType: string;
  vacancyCount: number;
  experience: string;
  state: string;
  country: string;
  min_salary: number;
  max_salary: number;
  lastDate: Date;
  languages: string[] | [];
  status?: StatusType;
  education: string;
  responsibilities: string[] | [];
  skills: string[] | [];
  description: string;
};
export type JobCardDto = {
  companyLogo: string;
  companyName: string;
  location: AddressType;
  title: string;
  jobType: string;
  experience: typeof Experience_Types;
  id: string;
  mode: WorkMode;
  min_salary: number;
  max_salary: number;
  createdAt: string;
  lastDate: string;
  skills: string[];
  vacancyCount: string;
};

export type JobDetailsDto = {
  id: string;
  title: string;
  mode: WorkMode;
  jobType: string;
  experience: string;
  min_salary: number;
  max_salary: number;
  totalApplicants: number;
  createdAt: string;
  vacancyCount: number;
  description: string;
  responsibilities: string[];
  skills: string[];
  requirements: string[];
  isReported: boolean;
  reportedBy: string[];

  companyName: string;
  companyLogo: string;
  industry: string;
  benefits: string[];
  companySize: string;
  aboutCompany: string;
  companyEmployeeCount: number;
  location: AddressType;
};
