import { Company } from '../../../domain/entities/company';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { companyDto } from '../../Dtos/companyDto';

export interface ICompanyAboutUpdateUseCase {
  execute(data: Partial<companyDto>, userId: string): Promise<Company>;
}

export class CompanyAboutUpdateUseCase implements ICompanyAboutUpdateUseCase {
  constructor(private companyRepository: ICompanyRepository) {}

  async execute(data: Partial<companyDto>, userId: string): Promise<Company> {
    const company = await this.companyRepository.findOne({ userId });
    if (!company || !company.id) {
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }
    console.log('data from UseCase', data);

    const entity = await this.companyRepository.save(company.id, {
      ...data,
      userId,
    });

    if (!entity)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    return entity;
  }
}
