import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IGoogleLoginUsecase } from '../../interfaces/auth/google-login.usecase';
import { IGoogleAuthServices } from '../../interfaces/services/google-auth.service';
import { ITokenService } from '../../interfaces/services/token.service';
import { loginOutPutDto } from '../../dtos/login.dto';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';
//import {AdminLoginOutPutDto} from'../../Dtos/adminDto'

export class GoogleLoginUsecase implements IGoogleLoginUsecase {
  private _userRepository: IUserRepository;
  private _googleAuthService: IGoogleAuthServices;
  private _tokenService: ITokenService;
  private _companyRepository: ICompanyRepository;
  private _applicationRepository: IApplicationRepository;
  constructor(
    userRepository: IUserRepository,
    googleAuthService: IGoogleAuthServices,
    tokenService: ITokenService,
    companyRepository: ICompanyRepository,
    applicationRepository: IApplicationRepository
  ) {
    this._userRepository = userRepository;
    this._googleAuthService = googleAuthService;
    this._tokenService = tokenService;
    this._companyRepository = companyRepository;
    this._applicationRepository = applicationRepository;
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

    let applications;
    if (user.role == UserRole.CANDIDATE) {
      applications = await this._applicationRepository.getDocsByUserId(user.id);
    }
    return {
      user,
      accessToken,
      refreshToken,
      companyId,
      isProfileCompleted: isProfileCompleted,
      appliedJobs: applications ? applications.map((a) => a.jobId) : undefined,
    };
  }
}
