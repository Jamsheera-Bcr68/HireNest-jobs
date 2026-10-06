import { Company } from '../../../domain/entities/company.entity';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { companyDto, CompanyUpdateDto } from '../../dtos/company.dto';
import { IFileResolverService } from '../../services/file-url-resolver.service';

export interface ICompanyUpdateProfileUseCase {
  execute(data: CompanyUpdateDto, userId: string): Promise<Company>;
}

export class CompanyProfileUpdate implements ICompanyUpdateProfileUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    private _fileUrlResolverService: IFileResolverService
  ) {}
  async execute(data: CompanyUpdateDto, userId: string): Promise<Company> {
    const company = await this.companyRepository.findOne({ userId: userId });

    if (!company || !company.id)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );

    const updated = await this.companyRepository.save(company.id, {
      ...data,
      userId: userId,
    });
    if (!updated)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );

    const fileUrlResolver = this._fileUrlResolverService.createResolver();
    return {
      ...updated,
      logoUrl: await fileUrlResolver(updated.logoUrl),
      document: {
        ...updated.document,
        file: (await fileUrlResolver(updated.document.file)) ?? '',
      },
    };
  }
}
