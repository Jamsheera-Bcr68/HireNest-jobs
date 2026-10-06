import { StatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';

import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { ISkillRepository } from '../../../domain/repository-interfaces/skill-repository.interface';

import { HomeResponseDto } from '../../dtos/response.dto';
import { SkillStatus } from '../../../domain/enums/skill.enum';
import { Skill } from '../../../domain/entities/skill.entity';
import { IFileResolverService } from '../../services/file-url-resolver.service';

export interface IGetHomeDataUseCase {
  execute(): Promise<HomeResponseDto>;
}

export class GetHomeDataUseCase implements IGetHomeDataUseCase {
  constructor(
    private _jobRepository: IJobRepository,
    private _userRepository: IUserRepository,
    private _SkillRepository: ISkillRepository,
    private _fileUrlResolverService: IFileResolverService
  ) {}
  async execute(): Promise<HomeResponseDto> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let todayJobCount = await this._jobRepository.count(
      {
        status: StatusEnum.ACTIVE,
      },
      'today'
    );
    let industryWise = await this._jobRepository.industryBasedJobs();
    let limit = 6;
    const { jobs } = await this._jobRepository.getJobs({}, limit, 1);
    const companyCount = await this._userRepository.getCount({
      role: UserRole.COMPANY,
    });
    const candidateCount = await this._userRepository.getCount({
      role: UserRole.CANDIDATE,
    });
    const activeJobCount = await this._jobRepository.count({
      status: StatusEnum.ACTIVE,
    });
    const activeSkills = await this._SkillRepository.getAll({
      status: SkillStatus.APPROVED,
    });
    const modifiedJobs = jobs.map((featured) => {
      const skillArray = featured.skills
        .map((id) => activeSkills.find((skill: Skill) => id == skill.id))
        .filter(Boolean);

      return {
        ...featured,
        skills: skillArray.map((skill) => skill!.skillName),
      };
    });
    // console.log('jobs', modifiedJobs);
    const fileUrlResolver = this._fileUrlResolverService.createResolver();
    return {
      currentDayPostCount: todayJobCount,
      industries: industryWise,
      featuredJobs: await Promise.all(
        modifiedJobs.map(async (job) => {
          return {
            ...job,
            companyLogo: await fileUrlResolver(job.companyLogo),
          };
        })
      ),
      stats: [
        { label: 'Active Jobs', value: activeJobCount },
        { label: 'Candidates', value: candidateCount },
        { label: ' Companies', value: companyCount },
      ],
    };
  }
}
