import { StatusEnum } from '../../../../domain/enums/status.enum';
import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { IAdminRepository } from '../../../../domain/repository-interfaces/admin.reporitory.interface';
import { ICompanyRepository } from '../../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../../domain/repository-interfaces/job-repository.interface';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { DashboardPendingsDto } from '../../../types/admin-dashboard.types';

export interface IDashboardPendingsUsecase {
  execute(userId: string, role: string): Promise<DashboardPendingsDto>;
}

export class DashboardPendingsUsecase implements IDashboardPendingsUsecase {
  constructor(
    private _companyRepository: ICompanyRepository,
    private _jobRepository: IJobRepository,
    private _adminRepository: IAdminRepository
  ) {}

  async execute(userId: string, role: string): Promise<DashboardPendingsDto> {
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
    const companies = await this._companyRepository.getCompanies(
      { status: StatusEnum.PENDING },
      3
    );

    const jobs = await this._jobRepository.getReportedJobs({
      isReported: true,
      limit: 3,
    });
    console.log('reported jobs jobs', jobs);
    const companyCount=await this._companyRepository.getCount({status:StatusEnum.PENDING})
    const jobCount=await this._jobRepository.getCount({isReported:true})

    return {
      companies: companies.map((com) => {
        const { country, state, place } = com.address;

        const location = state + ',' + country;

        return {
          id: com.id?.toString() ?? '',
          email: com.email,
          name: com.companyName,
          industry: com.industry,

          location: location,
          logoUrl: com.logoUrl,
          submittedAt: com.joinedAt.toDateString(),
        };
      }),
      jobs: jobs.map((j) => ({
        id: j.id,

        companyName: j.company,
        type: j.type,
        title: j.role,
        count: j.count,
      })),
      companyCount:companyCount,
      jobCount:jobCount
    };
  }
}
