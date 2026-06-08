import { Company } from '../../../domain/entities/company.entity';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { adminMessages } from '../../../shared/constants/messages/admin.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

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
