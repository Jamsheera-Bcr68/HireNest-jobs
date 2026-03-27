import { Company } from '../../../domain/entities/company';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { adminMessages } from '../../../shared/constants/messages/adminMessages';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export interface IAdminUpdateCompanyUseCase {
  execute(id: string, data: Partial<Company>): Promise<Company>;
}

export class AdminUpdateCompanyUseCase implements IAdminUpdateCompanyUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    private userRepository: IUserRepository
  ) {}
  async execute(id: string, data: Partial<Company>): Promise<Company> {
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new AppError(
        adminMessages.error.COMPANY_NOTFOUND,
        statusCodes.NOTFOUND
      );
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
    if (
      company.status === 'pending' &&
      data.isVerified &&
      data.status === 'active'
    ) {
      const userId = company.userId;
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new AppError(
          adminMessages.error.CANDIDATE_NOTFOUND,
          statusCodes.NOTFOUND
        );
      }
      await this.userRepository.save(userId, {
        ...user,
        role: UserRole.COMPANY,
        isRequested: false,
      });
    }
    return updated;
  }
}
