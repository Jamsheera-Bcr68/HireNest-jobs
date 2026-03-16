import { IForgotPasswordUsecase } from '../../interfaces/auth/IForgotPasswordUsecase';
import { AppError } from '../../../domain/errors/AppError';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { passwordResetToken } from '../../../infrastructure/services/resetTokenService';
import { IEmailService } from '../../interfaces/services/IEmailService';
import { UserRole } from '../../../domain/enums/userEnums';
import { IAdminRepository } from '../../../domain/repositoriesInterfaces/IAdminRepository';

export class ForgotPassWordUsecase implements IForgotPasswordUsecase {
  private _userRepository: IUserRepository;
  private _emailService: IEmailService;
  private _adminRepository: IAdminRepository;
  constructor(
    userRepository: IUserRepository,
    emailService: IEmailService,
    adminRepository: IAdminRepository
  ) {
    this._userRepository = userRepository;
    this._emailService = emailService;
    this._adminRepository = adminRepository;
  }
  async execute(email: string, role: UserRole): Promise<void> {
    const { resetToken, hashedToken } = passwordResetToken();
    if (role == 'admin') {
      const admin = await this._adminRepository.findByEmail(email);
      if (!admin) {
        throw new AppError(
          authMessages.error.EMAIL_NOTFOUND,
          statusCodes.NOTFOUND
        );
      }

      const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await this._adminRepository.updateResetToken(
        admin.id,
        hashedToken,
        resetTokenExpiry
      );
    } else {
      const user = await this._userRepository.findByEmail(email);
      if (!user || !user.id)
        throw new AppError(
          authMessages.error.EMAIL_NOTFOUND,
          statusCodes.NOTFOUND
        );

      const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await this._userRepository.updateResetToken(
        user.id,
        hashedToken,
        resetTokenExpiry
      );
    }

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}?role=${role}`;
    await this._emailService.sendResetPasswordLink(email, resetLink);
  }
}
