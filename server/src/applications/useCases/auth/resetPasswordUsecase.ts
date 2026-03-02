import { IResetPasswordUsecase } from '../../interfaces/auth/IResetPasswordUsecase';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { hashedPassword } from '../../../infrastructure/services/passwordHasher';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { AppError } from '../../../domain/errors/AppError';
import { hashedToken } from '../../../infrastructure/services/resetTokenService';

//import { passwordResetToken } from "../../../infrastructure/services/resetTokenService";

export class ResetPasswordUsecase implements IResetPasswordUsecase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }
  async execute(
    email: string,
    password: string,
    resetToken: string
  ): Promise<void> {
    const user = await this._userRepository.findByEmail(email);
    console.log('user reset usecase ', user);

    if (!user) {
      throw new AppError(
        authMessages.error.USER_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    } else if (!user.resetToken || !user.resetTokenExpiry) {
      console.log('!user.resetToken user.resetTokenExpiry ');

      throw new AppError(
        authMessages.error.PASSWORD_RESETTOKEN_EXPIRED,
        statusCodes.BADREQUEST
      );
    } else if (user.resetTokenExpiry < new Date()) {
      console.log('user.resetTokenExpiry<new Date()');

      throw new AppError(
        authMessages.error.PASSWORD_RESETTOKEN_EXPIRED,
        statusCodes.BADREQUEST
      );
    }

    const userToken = user?.resetToken;
    const hashResetToken = hashedToken(resetToken);
    if (hashResetToken !== userToken) {
      throw new AppError(
        authMessages.error.PASSWORD_RESETTOKEN_INVALID,
        statusCodes.BADREQUEST
      );
    }

    const hashPassword = await hashedPassword(password);
    await this._userRepository.updatePassword(email, hashPassword);
  }
}
