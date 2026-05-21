import { Company } from '../../../domain/entities/company.entity';
import { ICompanyRepository } from '../../../domain/repository-iInterfaces/company-repository.interface';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { AppError } from '../../../domain/errors/app-error';

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
