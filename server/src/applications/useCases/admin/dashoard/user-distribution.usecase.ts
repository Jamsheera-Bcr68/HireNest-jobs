import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { IUserRepository } from '../../../../domain/repository-interfaces/user-repository.interface';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { getPercentsgeOfTotal } from '../../../../shared/utils';
import { IDashboardDataListUsecase } from '../../../interfaces/dashboard/dashboard-data-list.usecase.interface';
import { UserDistributionChartData } from '../../../types/admin-dashboard.types';

export class UserDistributionUsecase implements IDashboardDataListUsecase<UserDistributionChartData> {
  constructor(private _userRepository: IUserRepository) {}
  async execute(
    userId: string,
    role: UserRole
  ): Promise<UserDistributionChartData[]> {
    if (role !== UserRole.ADMIN)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );
    const userData = await this._userRepository.getUserDistributionData();
    const total = userData.reduce((acc, val) => acc + val.count, 0);
    return userData.map((data) => {
      return { role: data._id, value: getPercentsgeOfTotal(total, data.count) };
    });
  }
}
