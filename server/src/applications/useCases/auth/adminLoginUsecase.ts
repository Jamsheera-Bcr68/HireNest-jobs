import { AdminLoginOutPutDto, AdminloginInput } from '../../Dtos/adminDto';
import { IAdminLoginUsecase } from '../../interfaces/auth/IAdminLoginUsecase';
import { IAdminRepository } from '../../../domain/repositoriesInterfaces/IAdminRepository';
import { AppError } from '../../../domain/errors/AppError';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { ITokenService } from '../../interfaces/services/ITokenService';
import { comparePassword } from '../../../infrastructure/services/passwordHasher';
import { UserRole } from '../../../domain/enums/userEnums';

export class AdminLoginUsecase implements IAdminLoginUsecase {
  private _adminRepository: IAdminRepository;
  private _tokenService: ITokenService;

  constructor(adminRepository: IAdminRepository, tokenService: ITokenService) {
    this._adminRepository = adminRepository;
    this._tokenService = tokenService;
  }
  async execute(input: AdminloginInput): Promise<AdminLoginOutPutDto> {
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
    const refreshToken = this._tokenService.generateRefreshToken(
      admin.id,
      admin.email,
      UserRole.ADMIN
    );
    return { admin, accessToken, refreshToken };
  }
}
