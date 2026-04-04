import { UserSkillDto } from '../../applications/Dtos/skillDto';
import { EducationType } from '../../presentation/http/validators/educationFormValidator';
import { StatusEnum } from '../enums/statusEnum';
import { WorkMode } from '../enums/WorkMode';
import { JobType, ExperienceType } from '../types/jobTypes';
import { Skill } from './skill';

export interface Job {
  id: string;
  title: string;
  mode: WorkMode;
  companyId: string;
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
  status: StatusEnum;
  description: string;
  isReported: boolean;
  reasonForSuspend?: string;
  reasonForRemove?: string;
  reportDetails: {
    reason: string;
    info: string;
    reportedBy: string;
    reportedAt?: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
