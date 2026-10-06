import { Company } from '../../../domain/entities/company.entity';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { adminMessages } from '../../../shared/constants/messages/admin.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IFileResolverService } from '../../services/file-url-resolver.service';

export interface IAdminGetCompanyUseCase {
  execute(id: string): Promise<Company>;
}

export class AdminGetCompanyUseCase implements IAdminGetCompanyUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    private _fileUrlResolverService: IFileResolverService
  ) {}
  async execute(id: string): Promise<Company> {
    const company = await this.companyRepository.findById(id);

    if (!company)
      throw new AppError(
        adminMessages.error.COMPANY_NOTFOUND,
        statusCodes.NOTFOUND
      );
    const fileUrlResolver = this._fileUrlResolverService.createResolver();
    return {
      ...company,
      logoUrl: await fileUrlResolver(company.logoUrl),
      document: {
        ...company.document,
        file: (await fileUrlResolver(company.document.file)) ?? '',
      },
    };
  }
}
