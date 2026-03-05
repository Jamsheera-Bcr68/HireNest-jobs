import { UserSkillDto } from './skillDto';
import { ExperienceType, JobType } from '../../domain/types/jobTypes';
import { WorkMode } from '../../domain/enums/WorkMode';

export interface jobDto {
  title: string;
  userId: string;
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
  education: string;
  responsibilities: string[] | [];
  skills: string[] | [];
  description: string;
}
