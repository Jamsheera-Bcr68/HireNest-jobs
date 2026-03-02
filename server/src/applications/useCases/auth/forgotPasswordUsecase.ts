import { IForgotPasswordUsecase } from '../../interfaces/auth/IForgotPasswordUsecase';
import { AppError } from '../../../domain/errors/AppError';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { passwordResetToken } from '../../../infrastructure/services/resetTokenService';
import { IEmailService } from '../../interfaces/services/IEmailService';

export class ForgotPassWordUsecase implements IForgotPasswordUsecase {
  private _userRepository: IUserRepository;
  private _emailService: IEmailService;
  constructor(userRepository: IUserRepository, emailService: IEmailService) {
    this._userRepository = userRepository;
    this._emailService = emailService;
  }
  async execute(email: string): Promise<void> {
    const user = await this._userRepository.findByEmail(email);
    if (!user || !user.id)
      throw new AppError(
        authMessages.error.EMAIL_NOTFOUND,
        statusCodes.NOTFOUND
      );
    const { resetToken, hashedToken } = passwordResetToken();

    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await this._userRepository.updateResetToken(
      user.id,
      hashedToken,
      resetTokenExpiry
    );
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await this._emailService.sendResetPasswordLink(email, resetLink);
  }
}
