import { IloginInput, loginOutPutDto } from '../../Dtos/loginDto';
import { IUserLoginUseCase } from '../../interfaces/auth/IUserLoginUseCase';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { User } from '../../../domain/entities/User';
import { AppError } from '../../../domain/errors/AppError';
import { comparePassword } from '../../../infrastructure/services/passwordHasher';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { ITokenService } from '../../interfaces/services/ITokenService';
import { UserRole } from '../../../domain/enums/userEnums';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { userMessages } from '../../../shared/constants/messages/userMessages';
//import { IAdminRepository } from "../../../domain/repositoriesInterfaces/IAdminRepository";

export class LoginUseCase implements IUserLoginUseCase {
  private _userRepository: IUserRepository;
  private _companyRepository: ICompanyRepository;
  private _tokenService: ITokenService;
  constructor(
    userRepository: IUserRepository,
    tokenService: ITokenService,
    companyRepository: ICompanyRepository
  ) {
    this._userRepository = userRepository;
    this._tokenService = tokenService;
    this._companyRepository = companyRepository;
  }
  async execute(input: IloginInput): Promise<loginOutPutDto> {
    const user: User | null = await this._userRepository.findByEmail(
      input.email
    );
    if (!user || !user.role || !user.id)
      throw new AppError(
        authMessages.error.USER_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    let companyId;
    if (user.role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(user.id);
      if (!company) {
        throw new AppError(
          userMessages.error.COMPANY_NOT_FOUND,
          statusCodes.NOTFOUND
        );
      }
      companyId = company.id;
    }

    if (!(await comparePassword(input.password, user.password)))
      throw new AppError(
        authMessages.error.BAD_REQUEST,
        statusCodes.UNAUTHERIZED
      );
    if (!user.id)
      throw new AppError(
        authMessages.error.USERID_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    const accessToken = this._tokenService.generateAccessToken(
      user.id?.toString(),
      user.email,
      user.role
    );

    const refreshToken = this._tokenService.generateRefreshToken(
      user.id,
      user.email,
      user.role
    );
    let isProfileCompleted;
    if (user.role === UserRole.CANDIDATE) {
      if (user.education.length && user.skills?.length && user.resumes.length) {
        isProfileCompleted = true;
      } else isProfileCompleted = false;
    }
    return { user, accessToken, refreshToken, companyId ,isProfileCompleted:isProfileCompleted};
  }
}
