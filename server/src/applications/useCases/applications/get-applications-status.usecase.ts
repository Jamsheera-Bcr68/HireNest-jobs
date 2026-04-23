import { ApplicationStatsCardType } from '../../Dtos/application.dto';
import { IGetEntityStatusUseCase } from '../../interfaces/admin/IGetEntityStatusUseCase';
import { Application } from '../../../domain/entities/application';
import { IApplicationRepository } from '../../../domain/repositoriesInterfaces/application.repository.interface';
import { ApplicationStatusEnum } from '../../../domain/enums/statusEnum';
import { UserRole } from '../../../domain/enums/userEnums';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { AppError } from '../../../domain/errors/AppError';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export class GetApplicationStatusUseCase implements IGetEntityStatusUseCase<ApplicationStatsCardType> {
  constructor(
    private _applicationRepository: IApplicationRepository,
    private _companyRepository: ICompanyRepository
  ) {}

  async execute(
    userId: string,
    role: string
  ): Promise<ApplicationStatsCardType> {
    const filter = {} as Partial<Application>;
    if (role == UserRole.CANDIDATE) {
      filter.candidateId = userId;
    }
    if (role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
      if (!company)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company'),
          statusCodes.NOTFOUND
        );
      filter.companyId = company.id;
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
    const interviewScheduled = await this._applicationRepository.count({
      ...filter,
      status: ApplicationStatusEnum.INTERVIEW_SCHEDULED,
    });
    return {
      total: total,
      rejected: rejected,
      shortListed: shortListed,
      pending: pending,
      interviewScheduled: interviewScheduled,
    };
  }
}
