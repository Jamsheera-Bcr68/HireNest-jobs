import { Company } from '../../../domain/entities/company';
import { UserRole } from '../../../domain/enums/userEnums';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { UploadFileDto } from '../../Dtos/uploadFileDto';
import { IFileStorageService } from '../../interfaces/services/IFileStorageServices';
import { AppError } from '../../../domain/errors/AppError';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { log } from 'util';

export interface IChangeLogogUseCase {
  execute(
    userId: string,
    role: UserRole,
    file: UploadFileDto
  ): Promise<Company>;
}

export class ChangeLogoUseCase implements IChangeLogogUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    private imageStorageService: IFileStorageService
  ) {}
  async execute(
    userId: string,
    role: UserRole,
    file: UploadFileDto
  ): Promise<Company> {
    const company = await this.companyRepository.findOne({ userId: userId });
    console.log('company by userId', company);

    if (!company || !company.id)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    const oldImg = company.logoUrl;

    const logoUrl = await this.imageStorageService.uploadFile(file);
    company.logoUrl = logoUrl;
    let updated = await this.companyRepository.save(company.id, company);
    if (oldImg) await this.imageStorageService.removeFile(oldImg);
    if (!updated)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    return updated;
  }
}
