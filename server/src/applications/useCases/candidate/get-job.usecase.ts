import { Company } from '../../../domain/entities/company.entity';
import { Job } from '../../../domain/entities/job.entity';
import { SkillStatus } from '../../../domain/enums/skill.enum';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-iInterfaces/company-repository.interface';
import { IJobRepository } from '../../../domain/repository-iInterfaces/job-repository.interface';
import { ISkillRepository } from '../../../domain/repository-iInterfaces/skill-repository.interface';
import { jobMessages } from '../../../shared/constants/messages/job.messages';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { JobDetailsDto } from '../../dtos/job.dto';
import { UserSkillDto } from '../../dtos/skill.dto';
import { JobReportType } from '../../dtos/job.dto';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';

export interface IGetJobDetailsUseCase {
  execute(id: string): Promise<JobDetailsDto>;
}

export class GetJobDetailsUseCase implements IGetJobDetailsUseCase {
  constructor(
    private jobRepository: IJobRepository,
    private companyRepository: ICompanyRepository,
    private skillRepository: ISkillRepository,
    private userRepository: IUserRepository
  ) {}
  private mapToJobDetailsDto(
    job: Job,
    company: Company,
    skillNames: UserSkillDto[],
    reports: JobReportType[]
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
      totalApplicants: 0,
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
    const job = await this.jobRepository.findById(id);
    if (!job || !job.companyId)
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);
    const company = await this.companyRepository.findById(job.companyId);
    if (!company) {
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }
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
    const reports = job.reportDetails
      ? await Promise.all(
          job.reportDetails.map(async (report) => {
            const user = await this.userRepository.findById(report.reportedBy);

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
    return this.mapToJobDetailsDto(job, company, skillnames, reports);
  }
}
