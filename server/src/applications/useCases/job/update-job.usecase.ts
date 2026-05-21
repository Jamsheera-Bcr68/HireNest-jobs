import { AppError } from '../../../domain/errors/app-error';
import { IJobRepository } from '../../../domain/repository-iInterfaces/job-repository.interface';
import { jobMessages } from '../../../shared/constants/messages/job.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { JobDetailsDto, JobDto, JobUpdateDto } from '../../dtos/job.dto';
import { UserRole } from '../../../domain/enums/user.enums';
import { SkillStatus } from '../../../domain/enums/skill.enum';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { ISkillRepository } from '../../../domain/repository-iInterfaces/skill-repository.interface';

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
