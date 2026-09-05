import { StatusEnum } from '../../../../domain/enums/status.enum';
import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { IAdminRepository } from '../../../../domain/repository-interfaces/admin.reporitory.interface';
import { ICompanyRepository } from '../../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../../domain/repository-interfaces/job-repository.interface';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { PendingActivityMapper } from '../../../mappers/pending.mapper';
import { PendingActivityDto } from '../../../types/pending.type';
import { ReportedJobFilter } from '../../../types/pending.type';

export interface IGetPendingUsecase {
  execute(
    userId: string,
    role: string,
    item: 'jobs' | 'companies' | '',
    limit: number,search?:string
  ): Promise<{ totalDocs: number; activities: PendingActivityDto[] }>;
}
export class GetPendingUsecase implements IGetPendingUsecase {
  constructor(
    private _adminRepository: IAdminRepository,
    private _companyRepository: ICompanyRepository,
    private _jobRepository: IJobRepository
  ) {}

  async execute(
    userId: string,
    role: UserRole,
    item: 'jobs' | 'companies' | '',
    limit: number,search?:string
  ): Promise<{ totalDocs: number; activities: PendingActivityDto[] }> {

    if (role !== UserRole.ADMIN)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );
    const admin = await this._adminRepository.findById(userId);
    if (!admin)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Admin'),
        statusCodes.NOTFOUND
      );

    const getJobs = async (): Promise<{
      jobs: PendingActivityDto[];
      totalJobs: number;
    }> => {
      const query: ReportedJobFilter = {};
      if(search)query.search=search
      query.isReported = true;
      query.limit = limit;
      const jobs = await this._jobRepository.getReportedJobs(query);
      console.log('searched jobs',jobs);
      
      const totalJobs = await this._jobRepository.count({ isReported: true });
      const mappedJobs = jobs.map((j) =>
        PendingActivityMapper.mapToReportedJob(j)
      );
      return { jobs: mappedJobs, totalJobs };
    };

    const getCompanies = async (): Promise<{
      companies: PendingActivityDto[];
      totalCompanies: number;
    }> => {
      const companies = await this._companyRepository.getCompanies(
        {
          status: StatusEnum.PENDING,search
        },
        limit
      );

      const totalCompanies = await this._companyRepository.getCount({
        status: StatusEnum.PENDING,
      });

      const mappedCompanies = companies.map((com) =>
        PendingActivityMapper.mapToPendingCompany(com)
      );
      return {
        companies: mappedCompanies,
        totalCompanies,
      };
    };
    let activities: PendingActivityDto[] = [];
    let totalDocs = 0;
    if (item === 'jobs') {
      const { jobs, totalJobs } = await getJobs();
      totalDocs = totalDocs + totalJobs;
      activities = jobs;
    } else if (item === 'companies') {
      const { companies, totalCompanies } = await getCompanies();
      totalDocs = totalDocs + totalCompanies;
      activities =  companies;
    } else {
      const { jobs, totalJobs } = await getJobs();
      const { companies, totalCompanies } = await getCompanies();
     activities = [...companies, ...jobs]
  .sort(
    (a, b) =>
      new Date(b.submitted).getTime() -
      new Date(a.submitted).getTime()
  )
  .slice(0, limit);

      totalDocs = totalCompanies + totalJobs;
    }

    return {
      activities,
      totalDocs,
    };
  }
}
