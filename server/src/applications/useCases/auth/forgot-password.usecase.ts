import { IForgotPasswordUsecase } from '../../interfaces/auth/forgot-password.usecase';
import { AppError } from '../../../domain/errors/app-error';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { passwordResetToken } from '../../../infrastructure/services/reset-token.service';
import { IEmailService } from '../../interfaces/services/email.service';
import { UserRole } from '../../../domain/enums/user.enums';
import { IAdminRepository } from '../../../domain/repository-interfaces/admin.reporitory.interface';

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
