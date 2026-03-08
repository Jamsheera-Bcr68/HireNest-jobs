import { Company } from '../../../domain/entities/company';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { companyDto, CompanyUpdateDto } from '../../Dtos/companyDto';

export interface ICompanyUpdateProfileUseCase {
  execute(data: CompanyUpdateDto, userId: string): Promise<Company>;
}

export class CompanyProfileUpdate implements ICompanyUpdateProfileUseCase {
  constructor(private companyRepository: ICompanyRepository) {}
  async execute(data: CompanyUpdateDto, userId: string): Promise<Company> {
    // if (data.companyName) {
    //   const companyexist = await this.companyRepository.findOne({
    //     companyName: data.companyName,
    //   });
    //   if (companyexist) {
    //     throw new AppError(
    //       userMessages.error.COMPANY_ALREADY_EXIST,
    //       statusCodes.CONFLICT
    //     );
    //   }
    // }
    const company = await this.companyRepository.findOne({ userId: userId });

    if (!company || !company.id)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    console.log('company befor update', company);

    const updated = await this.companyRepository.save(company.id, {
      ...data,
      userId: userId,
    });
    if (!updated)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    return updated;
  }
}
