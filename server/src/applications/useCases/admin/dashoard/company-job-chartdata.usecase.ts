import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../../domain/repository-interfaces/job-repository.interface';
import { chartDataDto } from '../../../../domain/types/chart.data.type';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { IDashboardChartDataUsecase } from '../../../interfaces/dashboard/chart-data.usecase.interface';
import { monthNames } from '../../../types/admin-dashboard.types';
import { AdminCompanyJobChartDto } from '../../../types/admin-dashboard.types';

export class AdminCompanyJobChartDataUsecase implements IDashboardChartDataUsecase<AdminCompanyJobChartDto> {
  constructor(
    private _companyRepository: ICompanyRepository,
    private _jobRepository: IJobRepository
  ) {}

  async execute(
    userId: string,
    role: UserRole
  ): Promise<AdminCompanyJobChartDto[]> {
    if (role !== UserRole.ADMIN)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );
    const jobData = await this._jobRepository.getMonthlyJobCount();
    const companyData = await this._companyRepository.getMonthlyCompanyCount();

    const data: AdminCompanyJobChartDto[] = [];

    for (let month = 1; month <= new Date().getMonth() + 1; month++) {
      const job = jobData.find((j) => j._id === month);
      const company = companyData.find((c) => c._id === month);

      data.push({
        month: monthNames[month],
        jobs: job?.count ?? 0,
        companies: company?.count ?? 0,
      });
    }

    return data;
  }
}
