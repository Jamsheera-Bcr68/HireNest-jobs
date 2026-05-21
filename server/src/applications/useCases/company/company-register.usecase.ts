import { Company } from '../../../domain/entities/company.entity';
import { User } from '../../../domain/entities/user.entity';
import { StatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-iInterfaces/company-repository.interface';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { CompanyRequestType } from '../../../domain/values/profile-types';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { companyDto } from '../../dtos/company.dto';
import { ICompanyRegisterUseCase } from '../../interfaces/company/company-register.usecase';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';

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
