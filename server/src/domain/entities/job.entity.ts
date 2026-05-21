import { UserSkillDto } from '../../applications/dtos/skill.dto';
import { EducationType } from '../../presentation/http/validators/education-form.validator';
import { StatusEnum } from '../enums/status.enum';
import { WorkMode } from '../enums/work-mode.enum';
import { JobType, ExperienceType } from '../types/job.types';
import { Skill } from './skill.entity';

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
