import { Company } from '../../../domain/entities/company.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { ICompanyRepository } from '../../../domain/repository-iInterfaces/company-repository.interface';
import { UploadFileDto } from '../../dtos/upload-file.dto';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';
import { AppError } from '../../../domain/errors/app-error';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
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
