import { Company } from '../../../domain/entities/company';
import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
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
    payload: companyDto,
    userId: string,
    role: UserRole
  ): Promise<Company> {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.id) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    payload.userId = userId;
    const company = this.companyRepository.create(payload);
    //  if(!company)throw new AppError(user)
    return company;
  }
}
