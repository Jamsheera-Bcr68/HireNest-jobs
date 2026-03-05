import { JobReqDto } from '../validators/company/jobValidation';
import { jobDto } from '../../../applications/Dtos/jobDto';
import { WorkMode } from '../../../domain/enums/WorkMode';
import { JobType, ExperienceType } from '../../../domain/types/jobTypes';
import { UserSkillDto } from '../../../applications/Dtos/skillDto';

export class JobMapper {
  static toJobDto(data: JobReqDto, userId: string): jobDto {
    return {
      title: data.title,
      userId: userId,
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
}
