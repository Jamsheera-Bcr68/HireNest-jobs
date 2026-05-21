import { JobReqDto } from '../validators/company/job-validation';
import { JobDto } from '../../../applications/dtos/job.dto';
import { WorkMode } from '../../../domain/enums/work-mode.enum';
import { JobType, ExperienceType } from '../../../domain/types/job.types';
import { UserSkillDto } from '../../../applications/dtos/skill.dto';
import { Job } from '../../../domain/entities/job.entity';

export class JobMapper {
  static toJobDto(data: JobReqDto): JobDto {
    return {
      title: data.title,

      mode: data.mode as WorkMode,
      jobType: data.jobType as JobType,
      vacancyCount: Number(data.vacancyCount),
      experience: data.experience as ExperienceType,
      state: data.state,
      country: data.country,
      min_salary: Number(data.min_salary),
      max_salary: Number(data.max_salary),
      lastDate: new Date(data.lastDate),
      languages: data.languages?.split(',') || [],
      education: data.education,
      responsibilities: data.responsibilities || [],
      skills: data.skills.length ? data.skills.map((sk) => sk.id!) : [],
      description: data.description,
    };
  }
  static toJobResDto(data: Job): JobDto {
    return {
      title: data.title,
      status: data.status,
      companyId: data.companyId,
      mode: data.mode as WorkMode,
      jobType: data.jobType as JobType,
      vacancyCount: Number(data.vacancyCount),
      experience: data.experience as ExperienceType,
      state: data.state,
      country: data.country,
      min_salary: Number(data.min_salary),
      max_salary: Number(data.max_salary),
      lastDate: new Date(data.lastDate),
      languages: data.languages || [],
      education: data.education,
      responsibilities: data.responsibilities || [],
      skills: data.skills,
      description: data.description,
    };
  }
}
