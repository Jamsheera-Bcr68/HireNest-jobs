import { Company } from '../../../domain/entities/company.entity';
import { StatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-iInterfaces/company-repository.interface';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { adminMessages } from '../../../shared/constants/messages/admin.messages';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

export interface IAdminUpdateCompanyUseCase {
  execute(
    id: string,
    data: Partial<Company>,
    reason?: string
  ): Promise<Company>;
}

export class AdminUpdateCompanyUseCase implements IAdminUpdateCompanyUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    private userRepository: IUserRepository
  ) {}
  async execute(
    id: string,
    data: Partial<Company>,
    reason?: string
  ): Promise<Company> {
    const company = await this.companyRepository.findById(id);
    console.log('reason', reason);

    if (!company) {
      throw new AppError(
        adminMessages.error.COMPANY_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }

    const { status } = data;
    if (status == 'rejected') {
      data.reasonForReject = reason;
    }
    if (status == 'suspended') {
      data.reasonForSuspend = reason;
    }
    const updated = await this.companyRepository.save(id, {
      ...company,
      ...data,
    });
    if (!updated) {
      throw new AppError(
        adminMessages.error.COMPANY_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }

    const userId = company.userId;
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(
        adminMessages.error.CANDIDATE_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }

    let requests = user.companyRequests;

    if (status === 'rejected') {
      requests = user.companyRequests.map((req) =>
        req.companyId !== company.id
          ? req
          : { ...req, status: StatusEnum.REJECTED, reasonForReject: reason }
      );

      await this.userRepository.save(userId, {
        companyRequests: requests,
        isRequested: false,
      });
    } else if (
      status === 'active' &&
      data.isVerified === true &&
      company.status === 'pending'
    ) {
      requests = user.companyRequests.map((req) =>
        req.companyId !== company.id
          ? req
          : { ...req, status: StatusEnum.ACTIVE }
      );
      await this.userRepository.save(userId, {
        role: UserRole.COMPANY,
        companyRequests: requests,
        isRequested: false,
      });
    }

    return updated;
  }
}
