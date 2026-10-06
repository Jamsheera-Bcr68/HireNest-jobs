import { Company } from '../../../domain/entities/company.entity';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { AppError } from '../../../domain/errors/app-error';
import { IFileResolverService } from '../../services/file-url-resolver.service';

export interface ILogoRemoveUseCase {
  execute(userId: string): Promise<Company>;
}

export class LogoRemoveUseCase implements ILogoRemoveUseCase {
  constructor(
    private _companyRepository: ICompanyRepository,
   private _fileUrlResolverService:IFileResolverService
  ) {}
  async execute(userId: string): Promise<Company> {
    const company = await this._companyRepository.findByUserId(userId);
    if (!company || !company.id) {
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }
    company.logoUrl = '';
    const updated = await this._companyRepository.save(company.id, company);
    if (!updated) {
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }
      const fileUrlResolver=this._fileUrlResolverService.createResolver()
    return {
      ...updated,
      logoUrl: await fileUrlResolver(updated.logoUrl),
      document: {
        ...updated.document,
        file: await fileUrlResolver(updated.document.file)??'',
      },
    };;
  }
}
