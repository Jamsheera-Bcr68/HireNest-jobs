import { JobFilter, JobListDto } from '../../dtos/job.dto';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { ISkillRepository } from '../../../domain/repository-interfaces/skill-repository.interface';
import { SkillStatus } from '../../../domain/enums/skill.enum';
import { Skill } from '../../../domain/entities/skill.entity';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { AppError } from '../../../domain/errors/app-error';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IFileResolverService } from '../../services/file-url-resolver.service';

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
    private _jobRepository: IJobRepository,
    private _skillRepository: ISkillRepository,
    private _userRepository: IUserRepository,
    private _fileUrlResolverService: IFileResolverService
  ) {}
  async execute(
    userId: string,
    filter: Partial<JobFilter>,

    limit: number,
    page: number,
    search?: { job: string; location: string },
    sortBy?: string
  ): Promise<JobListDto> {
    //  console.log('filter from usecase', filter);
    const user = await this._userRepository.findById(userId);
    if (!user || !user.id)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);

    const jobs = await this._jobRepository.getSavedJobs(
      user.savedJobs,
      filter ?? {},

      limit,
      page,
      search,
      sortBy
    );

    const activeSkills = await this._skillRepository.getAll({
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
    const count = await this._jobRepository.count(
      filter.datas ? filter.datas : {}
    );
    const fileUrlResolver = this._fileUrlResolverService.createResolver();
    return {
      jobs: await Promise.all(
        modifiedJobs.map(async (job) => ({
          ...job,
          companyLogo: await fileUrlResolver(job.companyLogo),
        }))
      ),
      totalDocs: count,
    };
  }
}
