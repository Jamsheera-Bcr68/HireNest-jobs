import { AdminLoginOutPutDto, AdminloginInput } from '../../dtos/admin.dto';
import { IAdminLoginUsecase } from '../../interfaces/auth/admin-login.usecase';
import { IAdminRepository } from '../../../domain/repository-interfaces/admin.reporitory.interface';
import { AppError } from '../../../domain/errors/app-error';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { ITokenService } from '../../interfaces/services/token.service';
import { comparePassword } from '../../../infrastructure/services/password-hasher.service';
import { UserRole } from '../../../domain/enums/user.enums';

export class AdminLoginUsecase implements IAdminLoginUsecase {
  private _adminRepository: IAdminRepository;
  private _tokenService: ITokenService;

  constructor(adminRepository: IAdminRepository, tokenService: ITokenService) {
    this._adminRepository = adminRepository;
    this._tokenService = tokenService;
  }
  async execute(
    input: AdminloginInput,
    role: UserRole
  ): Promise<AdminLoginOutPutDto> {
    const admin = await this._adminRepository.findByEmail(input.email);
    if (!admin)
      throw new AppError(
        authMessages.error.ADMIN_NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    if (!(await comparePassword(input.password, admin.password)))
      throw new AppError(
        authMessages.error.BAD_REQUEST,
        statusCodes.BADREQUEST
      );
    const accessToken = this._tokenService.generateAccessToken(
      admin.id,
      admin.email,
      UserRole.ADMIN
    );
    console.log(
      'just after ccreatign access',
      this._tokenService.verifyAccessToken(accessToken)
    );

    const refreshToken = this._tokenService.generateRefreshToken(
      admin.id,
      admin.email,
      UserRole.ADMIN
    );
    console.log(
      'just after ccreatign refresj',
      this._tokenService.verifyRefreshToken(refreshToken)
    );

    return { admin, accessToken, refreshToken };
  }
}
