import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { IApplicationRepository } from '../../../../domain/repository-interfaces/application.repository.interface';
import { ICompanyRepository } from '../../../../domain/repository-interfaces/company-repository.interface';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';

import {
  CompanyApplicationChartData,
  CompanyDashboardAppData,
} from '../../../types/company-dashboard.types';
import { monthNames } from '../../../types/admin-dashboard.types';
import { getDateAndTime, getTime } from '../../../../shared/utils';

export interface ICompanyDashboardAppDataUsecase {
  execute(userId: string, role: UserRole): Promise<CompanyDashboardAppData>;
}
export class CompanyDashboardAppDataUsecase implements ICompanyDashboardAppDataUsecase {
  constructor(
    private _applicationRepository: IApplicationRepository,
    private _companyRepository: ICompanyRepository
  ) {}

  async execute(
    userId: string,
    role: UserRole
  ): Promise<CompanyDashboardAppData> {
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

    const monthlyAppcount = await this._applicationRepository.monthlyAppCount({
      companyId: company.id,
    });

    const monthlyHires = await this._applicationRepository.getHiresPerMOnth({
      companyId: company.id,
    });

    const res = [];
    for (let month = 1; month <= new Date().getMonth() + 1; month++) {
      const app = monthlyAppcount.find((data) => data.month === month);
      const hire = monthlyHires.find((data) => data.month === month);
      res.push({
        month: monthNames[month],
        applicationCount: app?.count ?? 0,
        hired: hire?.count ?? 0,
      });
    }
    //latest applications
    const { applications } =
      await this._applicationRepository.getAllApplications({
        companyId: company.id,
        limit: 5,
        sortBy: 'newest',
      });
    const latest = applications.map((app) => {
      const appdate = getTime(new Date(app.appliedAt));
      return {
        id: app.id,
        name: app.applicant.name,
        status: app.status,
        role: app.jobTitle,
        imageUrl: app.applicant.imageUrl??'',
        appliedAt: appdate,
      };
    });
    const appStatusData = await this._applicationRepository.getCountByStatus({
      companyId: company.id,
    });
   
    

    return {
      chartData: res,
      latestApplications: latest,
      appStatusData: appStatusData.map((data) => ({
        stage: data.status,
        count: data.count,
      })),
    };
  }
}
