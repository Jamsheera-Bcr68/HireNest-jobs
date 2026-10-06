import { CompanyDataDto } from '../../dtos/company.dto';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { AppError } from '../../../domain/errors/app-error';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { CompanyMapper } from '../../mappers/company.mapper';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';
import { ApplicationStatusEnum } from '../../../domain/enums/status.enum';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';

export interface IGetCompanyDataUseCase {
  execute(companyId: string): Promise<CompanyDataDto>;
}

export class GetCompanyDataUseCase implements IGetCompanyDataUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    private _fileStorageService: IFileStorageService
  ) {}
  async execute(companyId: string): Promise<CompanyDataDto> {
    const company = await this.companyRepository.findById(companyId);

    if (!company)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    if (company) {
      company.document.file = await this._fileStorageService.getFileUrl(
        company.document.file
      );
    }

    return CompanyMapper.toCompanyDataDto(company);
  }
}
