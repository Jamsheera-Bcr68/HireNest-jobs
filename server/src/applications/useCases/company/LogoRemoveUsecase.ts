import { Company } from '../../../domain/entities/company';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { IFileStorageService } from '../../interfaces/services/IFileStorageServices';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { AppError } from '../../../domain/errors/AppError';

export interface ILogoRemoveUseCase {
  execute(userId: string): Promise<Company>;
}

export class LogoRemoveUseCase implements ILogoRemoveUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    private imageStorageService: IFileStorageService
  ) {}
  async execute(userId: string): Promise<Company> {
    const company = await this.companyRepository.findByUserId(userId);
    if (!company || !company.id) {
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }
    company.logoUrl = '';
    const updated = await this.companyRepository.save(company.id, company);
    if (!updated) {
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }
    return updated;
  }
}
