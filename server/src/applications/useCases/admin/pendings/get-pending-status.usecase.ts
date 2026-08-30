import { StatusEnum } from '../../../../domain/enums/status.enum';
import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { IAdminRepository } from '../../../../domain/repository-interfaces/admin.reporitory.interface';
import { ICompanyRepository } from '../../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../../domain/repository-interfaces/job-repository.interface';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { PendingStatusDataType } from '../../../types/pending.type';

export interface IGetPendingStatusUsecase {
  execute(userId: string, role: UserRole): Promise<PendingStatusDataType>;
}

export class GetPendingStatusUsecase implements IGetPendingStatusUsecase {
  constructor(
    private _jobRepository: IJobRepository,
    private _companyRepository: ICompanyRepository,
    private _adminRepository: IAdminRepository
  ) {}

  async execute(
    userId: string,
    role: UserRole
  ): Promise<PendingStatusDataType> {
    console.log('from GetPendingStatusUsecase');
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

    const pendingRegistrationCount = await this._companyRepository.getCount({
      status: StatusEnum.PENDING,
    })

    const reportedJobCount = await this._jobRepository.count({
      isReported: true,
     
    });

    return {
      jobs: reportedJobCount,
      companies: pendingRegistrationCount,
    };
  }
}
