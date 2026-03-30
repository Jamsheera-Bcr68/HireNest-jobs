import { JobFilter, JobListDto } from '../../Dtos/jobDto';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { SkillStatus } from '../../../domain/enums/skillEnum';
import { Skill } from '../../../domain/entities/skill';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { AppError } from '../../../domain/errors/AppError';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export interface IGetSavedJobsUseCase {
  execute(
    userId: string,
    filter: JobFilter,

    limit: number,
    page: number,
    search?: { job: string; location: string },
    sortBy?: string
  ): Promise<JobListDto>;
}

export class GetSavedJobUseCase implements IGetSavedJobsUseCase {
  constructor(
    private jobRepository: IJobRepository,
    private skillRepository: ISkillRepository,
    private userRepository: IUserRepository
  ) {}
  async execute(
    userId: string,
    filter: Partial<JobFilter>,

    limit: number,
    page: number,
    search?: { job: string; location: string },
    sortBy?: string
  ): Promise<JobListDto> {
    console.log('filter from usecase', filter);
    const user = await this.userRepository.findById(userId);
    if (!user || !user.id)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);

    const jobs = await this.jobRepository.getSavedJobs(
      user.savedJobs,
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
    const count = await this.jobRepository.count(
      filter.datas ? filter.datas : {}
    );
    return { jobs: modifiedJobs, totalDocs: count };
  }
}
