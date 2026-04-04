import { StatusEnum } from '../../../domain/enums/statusEnum';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { type JobStatusCardDto } from '../../Dtos/jobDto';

export interface IGetPostSatusUseCase {
  execute(userId: string, role: UserRole): Promise<JobStatusCardDto>;
}

export class GetPostSatusUseCase implements IGetPostSatusUseCase {
  constructor(
    private jobRepository: IJobRepository,
    private companyRepository: ICompanyRepository
  ) {}
  async execute(userId: string, role: UserRole): Promise<JobStatusCardDto> {
    let filter = {};
    if (role == UserRole.CANDIDATE) {
      const company = await this.companyRepository.findByUserId(userId);
      if (!company || !company.id) {
        throw new AppError(
          userMessages.error.COMPANY_NOT_FOUND,
          statusCodes.NOTFOUND
        );
      }
      filter = { companyId: company.id };
    }

    // const company = await this.companyRepository.findByUserId(userId);
    // if (!company || !company.id) {
    //   throw new AppError(
    //     userMessages.error.COMPANY_NOT_FOUND,
    //     statusCodes.NOTFOUND
    //   );
    // }
    const total = await this.jobRepository.count(filter);
    const active = await this.jobRepository.count({
      ...filter,
      status: StatusEnum.ACTIVE,
    });
    const suspended = await this.jobRepository.count({
      ...filter,
      status: StatusEnum.SUSPENDED,
    });
    const expired = await this.jobRepository.count({
      ...filter,
      status: StatusEnum.EXPIRED,
    });
    const reported = await this.jobRepository.count({
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
