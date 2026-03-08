import { Company } from '../../../domain/entities/company';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export interface IGetCompanyUseCase {
  execute(userId: string): Promise<Company>;
}

export class GetCompanyUseCase implements IGetCompanyUseCase {
  constructor(private companyRepository: ICompanyRepository) {}
  async execute(userId: string): Promise<Company> {
    const company = await this.companyRepository.findByUserId(userId);
    console.log('companyUserId', userId);

    if (!company)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    return company;
  }
}
