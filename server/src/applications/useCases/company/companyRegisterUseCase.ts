import { Company } from '../../../domain/entities/company';
import { User } from '../../../domain/entities/User';
import { StatusEnum } from '../../../domain/enums/statusEnum';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { CompanyRequestType } from '../../../domain/values/profileTypes';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { companyDto } from '../../Dtos/companyDto';
import { ICompanyRegisterUseCase } from '../../interfaces/services/company/ICompanyRegisterUseCase';
import { IFileStorageService } from '../../interfaces/services/IFileStorageServices';

export class CompanyRegisterUseCase implements ICompanyRegisterUseCase {
  constructor(
    private companyRepository: ICompanyRepository,

    private userRepository: IUserRepository
  ) {}
  async execute(
    payload: Partial<companyDto>,
    userId: string,
    role: UserRole
  ): Promise<Company> {
    console.log('pay load form usecase', payload);

    const user = await this.userRepository.findById(userId);
    if (!user || !user.id) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    payload.userId = userId;
    const company = await this.companyRepository.create(payload);
    if (!company.id) {
      throw new Error(userMessages.error.COMPANY_NOT_FOUND);
    }
    const request: CompanyRequestType = {
      companyId: company.id,
      status: StatusEnum.PENDING,
      date: new Date(),
    };

    await this.userRepository.save(userId, {
      ...user,
      isRequested: true,
      companyRequests: [...user.companyRequests, request],
    });
    return company;
  }
}
