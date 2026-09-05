import { StatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { type JobStatusCardDto } from '../../dtos/job.dto';

export interface IGetPostSatusUseCase {
  execute(userId: string, role: UserRole): Promise<JobStatusCardDto>;
}

export class GetPostSatusUseCase implements IGetPostSatusUseCase {
  constructor(
    private _jobRepository: IJobRepository,
    private _companyRepository: ICompanyRepository
  ) {}
  async execute(userId: string, role: UserRole): Promise<JobStatusCardDto> {
    let filter = {};
    if (role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
      if (!company || !company.id) {
        throw new AppError(
          userMessages.error.COMPANY_NOT_FOUND,
          statusCodes.NOTFOUND
        );
      }
      filter = { companyId: company.id };
    }

   
    const total = await this._jobRepository.count(filter);
    const active = await this._jobRepository.count({
      ...filter,
      status: StatusEnum.ACTIVE,
    });
    const suspended = await this._jobRepository.count({
      ...filter,
      status: StatusEnum.SUSPENDED,
    });
    const expired = await this._jobRepository.count({
      ...filter,
      status: StatusEnum.EXPIRED,
    });
    const reported = await this._jobRepository.count({
      ...filter,
      isReported: true,
    });

    return {
      total: total,
      active: active,
      suspended: suspended,
      expired: expired,
      reported: reported,
    };
  }
}
