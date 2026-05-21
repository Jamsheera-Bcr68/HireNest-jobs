import { ISkillRepository } from '../../../domain/repository-iInterfaces/skill-repository.interface';
import { IJobRepository } from '../../../domain/repository-iInterfaces/job-repository.interface';
import { JobListDto, JobFilter } from '../../dtos/job.dto';
import { SkillStatus } from '../../../domain/enums/skill.enum';
import { Skill } from '../../../domain/entities/skill.entity';

export interface IGetAllJobsUseCase {
  execute(
    filter: JobFilter,

    limit: number,
    page: number,
    search?: { job: string; location: string },
    sortBy?: string
  ): Promise<JobListDto>;
}
export class GetAllJobssUseCase implements IGetAllJobsUseCase {
  constructor(
    private jobRepository: IJobRepository,
    private skillRepository: ISkillRepository
  ) {}
  async execute(
    filter: Partial<JobFilter>,

    limit: number,
    page: number,
    search?: { job: string; location: string },
    sortBy?: string
  ): Promise<JobListDto> {
    console.log('filter from usecase', filter);
    if (sortBy) {
    }
    const { jobs, totalDocs } = await this.jobRepository.getJobs(
      filter ?? {},

      limit,
      page,
      search,
      sortBy
    );

    const activeSkills = await this.skillRepository.getAll({
      status: SkillStatus.APPROVED,
    });
    const modifiedJobs = jobs.map((job) => {
      const skillArray = job.skills
        .map((id) => activeSkills.find((skill: Skill) => id == skill.id))
        .filter(Boolean);

      return {
        ...job,
        skills: skillArray.map((skill) => skill!.skillName),
      };
    });

    return { jobs: modifiedJobs, totalDocs };
  }
}
