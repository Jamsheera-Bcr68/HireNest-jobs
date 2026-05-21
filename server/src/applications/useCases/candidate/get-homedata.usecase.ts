import { StatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { ICompanyRepository } from '../../../domain/repository-iInterfaces/company-repository.interface';
import { IJobRepository } from '../../../domain/repository-iInterfaces/job-repository.interface';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { ISkillRepository } from '../../../domain/repository-iInterfaces/skill-repository.interface';
import { JobMapper } from '../../../presentation/http/mappers/job.mapper';
import { HomeResponseDto } from '../../dtos/response.dto';
import { SkillStatus } from '../../../domain/enums/skill.enum';
import { Skill } from '../../../domain/entities/skill.entity';

export interface IGetHomeDataUseCase {
  execute(): Promise<HomeResponseDto>;
}

export class GetHomeDataUseCase implements IGetHomeDataUseCase {
  constructor(
    private jobRepository: IJobRepository,
    private userRepository: IUserRepository,
    private SkillRepository: ISkillRepository
  ) {}
  async execute(): Promise<HomeResponseDto> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let todayJobCount = await this.jobRepository.count(
      {
        status: StatusEnum.ACTIVE,
      },
      'today'
    );
    let industryWise = await this.jobRepository.industryBasedJobs();
    let limit = 6;
    const { jobs } = await this.jobRepository.getJobs({}, limit, 1);
    const companyCount = await this.userRepository.getCount({
      role: UserRole.COMPANY,
    });
    const candidateCount = await this.userRepository.getCount({
      role: UserRole.CANDIDATE,
    });
    const activeJobCount = await this.jobRepository.count({
      status: StatusEnum.ACTIVE,
    });
    const activeSkills = await this.SkillRepository.getAll({
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

    return {
      currentDayPostCount: todayJobCount,
      industries: industryWise,
      featuredJobs: modifiedJobs,
      stats: [
        { label: 'Active Jobs', value: activeJobCount },
        { label: 'Candidates', value: candidateCount },
        { label: ' Companies', value: companyCount },
      ],
    };
  }
}
