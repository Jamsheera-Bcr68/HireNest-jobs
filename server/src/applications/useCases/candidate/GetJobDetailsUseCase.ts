import { Company } from '../../../domain/entities/company';
import { Job } from '../../../domain/entities/Job';
import { SkillStatus } from '../../../domain/enums/skillEnum';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { JobDetailsDto } from '../../Dtos/jobDto';
import { UserSkillDto } from '../../Dtos/skillDto';
import { JobReportType } from '../../Dtos/jobDto';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';

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
