import { AppError } from '../../../domain/errors/AppError';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { JobDetailsDto, JobDto, JobUpdateDto } from '../../Dtos/jobDto';
import { UserRole } from '../../../domain/enums/userEnums';
import { SkillStatus } from '../../../domain/enums/skillEnum';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';

export interface IUpdateJobUseCase {
  execute(
    jobid: string,
    role: UserRole,
    userId: string,
    data: JobUpdateDto
  ): Promise<JobDto>;
}
export class UpdateJobUseCase implements IUpdateJobUseCase {
  constructor(
    private jobRepository: IJobRepository,
    private userRepository: IUserRepository,
    private skillRepository: ISkillRepository
  ) {}
  async execute(
    jobid: string,
    role: UserRole,
    userId: string,
    data: JobUpdateDto
  ): Promise<JobDto> {
    const job = await this.jobRepository.findById(jobid);
    if (!job || !job.id)
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);
    const user = await this.userRepository.findById(userId);
    if (!user || user.role !== role)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    const updated = await this.jobRepository.update(job.id, {
      ...job,
      ...data,
      updatedAt: new Date(),
    });

    const skills = await this.skillRepository.getAll({
      status: SkillStatus.APPROVED,
    });
    if (!skills.length)
      throw new AppError(
        jobMessages.error.SKILL_NOT_FOUND,
        statusCodes.NOTFOUND
      );

    const skillIds = new Set(job.skills.map(String));

    const skillnames = skills.filter((skill) => skillIds.has(String(skill.id)));

    if (!updated)
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);
    return updated as JobDto;
  }
}
