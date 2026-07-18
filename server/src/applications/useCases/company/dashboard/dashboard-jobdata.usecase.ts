import { StatusEnum } from '../../../../domain/enums/status.enum';
import { UserRole } from '../../../../domain/enums/user.enums';
import { WorkMode } from '../../../../domain/enums/work-mode.enum';
import { AppError } from '../../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../../domain/repository-interfaces/job-repository.interface';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { IDashboardDataListUsecase } from '../../../interfaces/dashboard/dashboard-data-list.usecase.interface';
import { DashboardJobData } from '../../../types/company-dashboard.types';

export interface ICompanyDashboardJobDataUsecase {
  execute(userId: string, role: UserRole): Promise<DashboardJobData>;
}

export class CompanyDashboardTopJobsUsecase implements ICompanyDashboardJobDataUsecase {
  constructor(
    private _jobRepository: IJobRepository,
    private _companyRepository: ICompanyRepository
  ) {}

  async execute(userId: string, role: UserRole): Promise<DashboardJobData> {
    if (role !== UserRole.COMPANY)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );
    const company = await this._companyRepository.findByUserId(userId);
    if (!company)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );

    const { jobs } = await this._jobRepository.getJobs(
      { companyId: company.id },
      5,
      1,
      { job: '', location: '' },
      'app-count'
    );

    const aggregated = await this._jobRepository.getJobs(
      { companyId: company.id, status: StatusEnum.ACTIVE },
      4,
      1,
      { job: '', location: '' },
      'newest'
    );

    return {
      topJobs: jobs.map((j) => ({
        title: j.title,
        applicants: j.appCount ? j.appCount : 0,
      })),
      activeJobs: aggregated.jobs.map((job) => {
        const location =
          job.mode === WorkMode.REMOTE
            ? 'Remote'
            : [job.location?.place, job.location?.state, job.location?.country]
                .filter(Boolean)
                .join(', ');
        return {
          id: job.id,
          title: job.title,
          type: job.jobType,
          location: location,
          applicants: job.appCount ?? 0,
          status: job.status,
        };
      }),
    };
  }
}
