import { ApplicationStatsCardType } from '../../Dtos/application.dto';
import { IGetEntityStatusUseCase } from '../../interfaces/admin/IGetEntityStatusUseCase';
import { Application } from '../../../domain/entities/application';
import { IApplicationRepository } from '../../../domain/repositoriesInterfaces/application.repository.interface';
import { ApplicationStatusEnum } from '../../../domain/enums/statusEnum';

export class GetApplicationStatusUseCase implements IGetEntityStatusUseCase<ApplicationStatsCardType> {
  constructor(private _applicationRepository: IApplicationRepository) {}

  async execute(userId?: string): Promise<ApplicationStatsCardType> {
    const filter = {} as Partial<Application>;
    if (userId) {
      filter.candidateId = userId;
    }

    const total = await this._applicationRepository.count(filter);


    const rejected = await this._applicationRepository.count({
      ...filter,
      status: ApplicationStatusEnum.REJECTED,
    });
    const shortListed = await this._applicationRepository.count({
      ...filter,
      status: ApplicationStatusEnum.SHORT_LISTED,
    });
    const pending = await this._applicationRepository.count({
      ...filter,
      status: ApplicationStatusEnum.PENDING,
    });
    return {
      total: total,
      rejected: rejected,
      shortListed: shortListed,
      pending: pending,
    };
  }
}
