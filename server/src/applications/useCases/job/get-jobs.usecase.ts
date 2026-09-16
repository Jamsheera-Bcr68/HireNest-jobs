import { ISkillRepository } from '../../../domain/repository-interfaces/skill-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { JobListDto, JobFilter } from '../../dtos/job.dto';
import { SkillStatus } from '../../../domain/enums/skill.enum';
import { Skill } from '../../../domain/entities/skill.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { User } from '../../../domain/entities/user.entity';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { StatusEnum } from '../../../domain/enums/status.enum';

export interface IGetAllJobsUseCase {
  execute(
    userId: string,
    role: UserRole,
    filter: JobFilter,

    limit: number,
    page: number,
    search?: { job: string; location: string },
    sortBy?: string
  ): Promise<JobListDto>;
}
export class GetAllJobssUseCase implements IGetAllJobsUseCase {
  constructor(
    private _jobRepository: IJobRepository,
    private _skillRepository: ISkillRepository,
    private _userRepository: IUserRepository
  ) {}
  async execute(
    userId: string,
    role: UserRole,
    filter: Partial<JobFilter>,

    limit: number,
    page: number,
    search?: { job: string; location: string },
    sortBy?: string
  ): Promise<JobListDto> {
    //  console.log('filter from usecase', filter);
    await this._jobRepository.handleExpiredJobs();
    let query: JobFilter = {};
    const hasSearch =
      Boolean(search?.job?.trim()) || Boolean(search?.location?.trim());
    const hasFilter = Object.keys(filter ?? {}).length > 0;

    const isInitialCandidateListing =
      role === UserRole.CANDIDATE && !hasSearch && !hasFilter;

    if (isInitialCandidateListing) {
      console.log('candidate initial listing');

      const user = await this._userRepository.findById(userId);
      if (!user || !user.id) {
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Candidate'),
          statusCodes.NOTFOUND
        );
      }
      query.skills = user.skills?.map((sk) => sk.id);
      console.log('candidate skills ', query.skills);
      const title=user.title
      if(title){
        const normalised=title.split(' ').map(t=>t.toLowerCase())
        if(normalised.length){
          query.title=[...new Set(normalised)]
        }
      }
      query.status = StatusEnum.ACTIVE;
    } else {
      console.log('candidates not  initial listing,filter', filter);
      query = { ...filter };
    }

    const { jobs, totalDocs } = await this._jobRepository.getJobs(
      query ?? {},

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

     console.log('from getAll jobs', modifiedJobs);
    return { jobs: modifiedJobs, totalDocs };
  }
}
