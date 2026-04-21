import { CompanyDataDto } from '../../Dtos/companyDto';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { AppError } from '../../../domain/errors/AppError';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { CompanyMapper } from '../../mappers/companyMapper';

export interface IGetCompanyDataUseCase {
  execute(companyId: string): Promise<CompanyDataDto>;
}

export class GetCompanyDataUseCase implements IGetCompanyDataUseCase {
  constructor(private companyRepository: ICompanyRepository) {}
  async execute(companyId: string): Promise<CompanyDataDto> {
    const company = await this.companyRepository.findById(companyId);

    if (!company)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    return CompanyMapper.toCompanyDataDto(company);
  }
}
