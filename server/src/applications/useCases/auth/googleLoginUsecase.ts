import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IGoogleLoginUsecase } from '../../interfaces/auth/IgoogleLoginUsecase';
import { IGoogleAuthServices } from '../../interfaces/services/IGoogleAuthServices';
import { ITokenService } from '../../interfaces/services/ITokenService';
import { loginOutPutDto } from '../../Dtos/loginDto';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
//import {AdminLoginOutPutDto} from'../../Dtos/adminDto'


export class GoogleLoginUsecase implements IGoogleLoginUsecase {
  private _userRepository: IUserRepository;
  private _googleAuthService: IGoogleAuthServices;
  private _tokenService: ITokenService;
  private _companyRepository: ICompanyRepository;
  constructor(
    userRepository: IUserRepository,
    googleAuthService: IGoogleAuthServices,
    tokenService: ITokenService,
    companyRepository:ICompanyRepository
  ) {
    this._userRepository = userRepository;
    this._googleAuthService = googleAuthService;
    this._tokenService = tokenService;
    this._companyRepository = companyRepository;
  }
  async execute(token: string, role: UserRole): Promise<loginOutPutDto> {
    /// console.log('from google login usecase');
    // console.log(role);

    const googleUser = await this._googleAuthService.getUserInfo(token);
    //console.log('google user ', googleUser);

    const user = await this._userRepository.findByEmail(googleUser.email);

    if (!user || !user.id || !user.role) {
      throw new AppError(
        authMessages.error.USER_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }
    if (!user.googleId) {
      await this._userRepository.updateGoogleId(
        googleUser.email,
        googleUser.googleId
      );
    } else if (user.googleId !== googleUser.googleId) {
      throw new AppError(
        authMessages.error.GOOGLE_INVALID_GOOGLEID,
        statusCodes.BADREQUEST
      );
    }
    let companyId;
    if (user.role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(user.id);
      if (!company) {
        throw new AppError(
          authMessages.error.USER_NOT_FOUND,
          statusCodes.NOTFOUND
        );
      }
      companyId = company.id;
    }
    const accessToken = this._tokenService.generateAccessToken(
      user.id,
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
    return {
      user,
      accessToken,
      refreshToken,
      companyId,
      isProfileCompleted: isProfileCompleted,
    };
  }
}
