import { Skill } from '../../../../domain/entities/skill.entity';
import { SkillStatus } from '../../../../domain/enums/skill.enum';
import { StatusEnum } from '../../../../domain/enums/status.enum';
import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { IApplicationRepository } from '../../../../domain/repository-interfaces/application.repository.interface';
import { IJobRepository } from '../../../../domain/repository-interfaces/job-repository.interface';
import { ISkillRepository } from '../../../../domain/repository-interfaces/skill-repository.interface';
import { IUserRepository } from '../../../../domain/repository-interfaces/user-repository.interface';
import { JobType } from '../../../../domain/types/job.types';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { JobCardDto } from '../../../dtos/job.dto';

export interface IRecomentedJobsUsecase {
  execute(userId: string, role: UserRole): Promise<JobCardDto[]>;
}

export class RecomentedJobUsecase implements IRecomentedJobsUsecase {
  constructor(
    private _jobRepository: IJobRepository,
    private _candidateRepository: IUserRepository,
    private _skillRepository: ISkillRepository,
    private _appRepository: IApplicationRepository
  ) {}
  async execute(userId: string, role: UserRole): Promise<JobCardDto[]> {
    if (role !== UserRole.CANDIDATE)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );

    const candidate = await this._candidateRepository.findById(userId);
    if (!candidate)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );
    const applied = await this._appRepository.getDocsByUserId(userId)
    const jobIds=applied.map(app=>app.jobId)
    const skillIds = candidate.skills?.map((s) => s.id);

    const { jobs } = await this._jobRepository.getJobs(
      { skills: skillIds, status: StatusEnum.ACTIVE,appliedJobIds:jobIds },
      3,
      1,
      { job: '', location: '' },
      'newest'
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

    return modifiedJobs;
  }
}
