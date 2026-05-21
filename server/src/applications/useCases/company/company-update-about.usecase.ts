import { Company } from '../../../domain/entities/company.entity';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-iInterfaces/company-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { companyDto } from '../../dtos/company.dto';

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
