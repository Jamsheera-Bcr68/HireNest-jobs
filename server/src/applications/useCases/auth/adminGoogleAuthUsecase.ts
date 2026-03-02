import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IAdminRepository } from '../../../domain/repositoriesInterfaces/IAdminRepository';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { AdminLoginOutPutDto } from '../../Dtos/adminDto';
import { IAdminGoogleAuthUsecase } from '../../interfaces/auth/IAdminGoogleAuthUsecase';
import { IGoogleAuthServices } from '../../interfaces/services/IGoogleAuthServices';
import { ITokenService } from '../../interfaces/services/ITokenService';

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

    return { admin, accessToken, refreshToken };
  }
}
