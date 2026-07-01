import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IGetUserUseCase } from '../../interfaces/user/get-user-data.usecase';
import { userProfileDto } from '../../dtos/user.dto';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { UserMapper } from '../../mappers/user.mapper';
import { Company } from '../../../domain/entities/company.entity';

export class GetUserUseCase implements IGetUserUseCase {
  private _userRepository: IUserRepository;
  private _companyRepository: ICompanyRepository;
  constructor(
    userRepository: IUserRepository,
    companyRepository: ICompanyRepository
  ) {
    this._userRepository = userRepository;
    this._companyRepository = companyRepository;
  }

  async execute(userId: string, role: UserRole): Promise<userProfileDto> {
    const user = await this._userRepository.findById(userId);
    if (!user || user.role !== role)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
   // console.log('user from getuser ', user);
    let company: Company | null = null;
    if (user.isRequested) {
   //   console.log('use is requested');

      company = await this._companyRepository.findByUserId(userId);
      
    }

   // console.log(
    //   'company to client',
    //   UserMapper.toUserProfileDto(user, company)
    // );

    return UserMapper.toUserProfileDto(user, company);
  }
}
