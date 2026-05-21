import { ApplicationStatsCardType } from '../../dtos/application.dto';
import { IGetEntityStatusUseCase } from '../../interfaces/admin/get-admin-entity-status.usecase';
import { Application } from '../../../domain/entities/application.entity';
import { IApplicationRepository } from '../../../domain/repository-iInterfaces/application.repository.interface';
import { ApplicationStatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { ICompanyRepository } from '../../../domain/repository-iInterfaces/company-repository.interface';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

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
