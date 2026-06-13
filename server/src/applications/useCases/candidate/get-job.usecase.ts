import { Company } from '../../../domain/entities/company.entity';
import { Job } from '../../../domain/entities/job.entity';
import { SkillStatus } from '../../../domain/enums/skill.enum';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { ISkillRepository } from '../../../domain/repository-interfaces/skill-repository.interface';
import { jobMessages } from '../../../shared/constants/messages/job.messages';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { JobDetailsDto } from '../../dtos/job.dto';
import { UserSkillDto } from '../../dtos/skill.dto';
import { JobReportType } from '../../dtos/job.dto';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';

export interface IGetJobDetailsUseCase {
  execute(id: string): Promise<JobDetailsDto>;
}

export class GetJobDetailsUseCase implements IGetJobDetailsUseCase {
  constructor(
    private _jobRepository: IJobRepository,
    private _companyRepository: ICompanyRepository,
    private _skillRepository: ISkillRepository,
    private _userRepository: IUserRepository,
    private _applicationRepository: IApplicationRepository
  ) {}
  private mapToJobDetailsDto(
    job: Job,
    company: Company,
    skillNames: UserSkillDto[],
    reports: JobReportType[],count:number
  ): JobDetailsDto {
    return {
      id: job.id.toString(),
      title: job.title,
      languages: job.languages?.join(','),
      mode: job.mode,
      jobType: job.jobType,
      education: job.education,
      status: job.status,
      experience: job.experience,
      min_salary: job.min_salary,
      max_salary: job.max_salary,
      totalApplicants: count,
      isReported: job.isReported,
      reportDetails: reports ?? job.reportDetails,
      companyId: job.companyId,
      createdAt: job.createdAt?.toISOString() || '',
      vacancyCount: job.vacancyCount,
      description: job.description,
      lastDate: job.lastDate.toString(),
      responsibilities: job.responsibilities ?? [],
      skills: skillNames || [],
      companyName: company.companyName,
      companyLogo: company.logoUrl,
      industry: company.industry,
      benefits: company.benefits ?? [],
      aboutCompany: company.about ?? '',
      companyEmployeeCount: company.size ?? 0,
      location: company.address,
      companySize: company.size,
    };
  }
  async execute(id: string): Promise<JobDetailsDto> {
    const job = await this._jobRepository.findById(id);
    if (!job || !job.companyId)
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);
    const company = await this._companyRepository.findById(job.companyId);
    if (!company) {
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }
    const skills = await this._skillRepository.getAll({
      status: SkillStatus.APPROVED,
    });
    if (!skills.length)
      throw new AppError(
        jobMessages.error.SKILL_NOT_FOUND,
        statusCodes.NOTFOUND
      );

    const skillIds = new Set(job.skills.map(String));

    const skillnames = skills.filter((skill) => skillIds.has(String(skill.id)));
    const reports = job.reportDetails
      ? await Promise.all(
          job.reportDetails.map(async (report) => {
            const user = await this._userRepository.findById(report.reportedBy);

            if (user) {
              return {
                ...report,
                reportedBy: user.name ?? user.email,
              };
            }

            return report;
          })
        )
      : [];

    const applicationCount: number = await this._applicationRepository.count({
      jobId: job.id,
    });
    return this.mapToJobDetailsDto(job, company, skillnames, reports,applicationCount);
  }
}
