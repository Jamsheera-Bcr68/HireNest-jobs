import { Company } from '../../../domain/entities/company.entity';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

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
