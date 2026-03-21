import { Company } from '../../../domain/entities/company';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { adminMessages } from '../../../shared/constants/messages/adminMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export interface IAdminGetCompanyUseCase {
  execute(id: string): Promise<Company>;
}

export class AdminGetCompanyUseCase implements IAdminGetCompanyUseCase {
  constructor(private companyRepository: ICompanyRepository) {}
  async execute(id: string): Promise<Company> {
    const company = await this.companyRepository.findById(id);
    if (!company)
      throw new AppError(
        adminMessages.error.COMPANY_NOTFOUND,
        statusCodes.NOTFOUND
      );
    return company;
  }
}
