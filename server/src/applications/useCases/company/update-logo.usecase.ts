import { Company } from '../../../domain/entities/company.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
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
  ): Promise<string | undefined>;
}

export class ChangeLogoUseCase implements IChangeLogogUseCase {
  constructor(
    private _companyRepository: ICompanyRepository,
    private _fileStorageService: IFileStorageService
  ) {}
  async execute(
    userId: string,
    role: UserRole,
    file: UploadFileDto
  ): Promise<string | undefined> {
    console.log('from comapny update logo usecase');

    const company = await this._companyRepository.findOne({ userId });
    //  console.log('company by userId', company);

    if (!company || !company.id)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    const oldImg = company.logoUrl;

    const logoUrl = await this._fileStorageService.uploadFile(
      file,
      'companies/logos',
      'jpg'
    );
    console.log('new Url is ', logoUrl);

    company.logoUrl = logoUrl;
    const updated = await this._companyRepository.save(company.id, company);
    if (oldImg) await this._fileStorageService.removeFile(oldImg);
    if (!updated)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    return updated.logoUrl
      ? await this._fileStorageService.getFileUrl(updated.logoUrl)
      : undefined;
  }
}
