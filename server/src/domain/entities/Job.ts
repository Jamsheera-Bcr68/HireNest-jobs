import { WorkMode } from '../enums/WorkMode';
import { JobType, ExperienceType } from '../types/jobTypes';

export interface Job {
  id: string;
  title: string;
  mode: WorkMode;
  userId: string;
  jobType: JobType;
  vacancyCount: number;
  experience: ExperienceType;
  state: string;
  country: string;
  min_salary: number;
  max_salary: number;
  lastDate: Date;
  languages?: string[] | [];
  education: string;
  responsibilities: string[] | [];
  skills: string[] | [];
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
