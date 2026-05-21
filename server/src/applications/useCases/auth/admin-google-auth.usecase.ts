import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IAdminRepository } from '../../../domain/repository-iInterfaces/admin.reporitory.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { AdminLoginOutPutDto } from '../../dtos/admin.dto';
import { IAdminGoogleAuthUsecase } from '../../interfaces/auth/admin-google-auth.usecase';
import { IGoogleAuthServices } from '../../interfaces/services/google-auth.service';
import { ITokenService } from '../../interfaces/services/token.service';

export class AdminGoogleAuthUsecase implements IAdminGoogleAuthUsecase {
  private _googleAuthService: IGoogleAuthServices;
  private _adminRepository: IAdminRepository;
  private _tokenService: ITokenService;

  constructor(
    googleAuthService: IGoogleAuthServices,
    adminRepository: IAdminRepository,
    tokenService: ITokenService
  ) {
    this._googleAuthService = googleAuthService;
    this._adminRepository = adminRepository;
    this._tokenService = tokenService;
  }
  async execute(token: string, role: UserRole): Promise<AdminLoginOutPutDto> {
    const googleUser = await this._googleAuthService.getUserInfo(token);
    const admin = await this._adminRepository.findByEmail(googleUser.email);
    if (!admin || admin.role !== UserRole.ADMIN) {
      throw new AppError(
        authMessages.error.ADMIN_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }
    if (!admin.googleId) {
      await this._adminRepository.updateGoogleId(
        admin.email,
        googleUser.googleId
      );
    } else if (admin.googleId !== googleUser.googleId) {
      throw new AppError(
        authMessages.error.GOOGLE_INVALID_GOOGLEID,
        statusCodes.BADREQUEST
      );
    }
    const accessToken = this._tokenService.generateAccessToken(
      admin.id,
      admin.email,
      UserRole.ADMIN
    );
    const refreshToken = this._tokenService.generateRefreshToken(
      admin.id,
      admin.email,
      UserRole.ADMIN
    );
    // console.log('refreshToken',refreshToken);

    // console.log('from login admin ry6y decoded soon after from usecase login',this._tokenService.verifyRefreshToken(refreshToken))

    return { admin, accessToken, refreshToken };
  }
}
