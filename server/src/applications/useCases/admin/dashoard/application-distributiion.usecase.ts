import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { IApplicationRepository } from '../../../../domain/repository-interfaces/application.repository.interface';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { IDashboardChartDataUsecase } from '../../../interfaces/dashboard/chart-data.usecase.interface';
import { ApplcationDistributionChartData } from '../../../types/admin-dashboard.types';

export class ApplcationDistributionUsecase implements IDashboardChartDataUsecase<ApplcationDistributionChartData> {
  // constructor(private _applcationDistributionUsecase:IDashboardChartDataUsecase<ApplcationDistributionChartData>){}
  constructor(private _appliationRepository: IApplicationRepository) {}

  async execute(
    userId: string,
    role: UserRole
  ): Promise<ApplcationDistributionChartData[]> {
    if (role !== UserRole.ADMIN)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );

    const appData =
      await this._appliationRepository.getIndustryWiseApplcationCount();
    return appData.map((data) => ({ industry: data._id, count: data.count }));
  }
}
