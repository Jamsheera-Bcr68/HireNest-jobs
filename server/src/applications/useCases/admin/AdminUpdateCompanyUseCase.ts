import { Company } from '../../../domain/entities/company';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { adminMessages } from '../../../shared/constants/messages/adminMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export interface IAdminUpdateCompanyUseCase {
  execute(id: string, data: Partial<Company>): Promise<Company>;
}

export class AdminUpdateCompanyUseCase implements IAdminUpdateCompanyUseCase {
  constructor(private companyRepository: ICompanyRepository) {}
  async execute(id: string, data: Partial<Company>): Promise<Company> {
    const company = await this.companyRepository.findById(id)
    if (!company) {
      throw new AppError(
        adminMessages.error.COMPANY_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }
   const updated= await this.companyRepository.save(id,{...company,...data})
   if (!updated) {
      throw new AppError(
        adminMessages.error.COMPANY_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }
    return updated;
  }
}
