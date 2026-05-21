import { IResetPasswordUsecase } from '../../interfaces/auth/reset-password.usecase';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { hashedPassword } from '../../../infrastructure/services/password-hasher.service';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { AppError } from '../../../domain/errors/app-error';
import { hashedToken } from '../../../infrastructure/services/reset-token.service';
import { IAdminRepository } from '../../../domain/repository-iInterfaces/admin.reporitory.interface';

//import { passwordResetToken } from "../../../infrastructure/services/resetTokenService";

export class ResetPasswordUsecase implements IResetPasswordUsecase {
  private _userRepository: IUserRepository;
  private _adminRepository: IAdminRepository;
  constructor(
    userRepository: IUserRepository,
    adminRepository: IAdminRepository
  ) {
    this._userRepository = userRepository;
    this._adminRepository = adminRepository;
  }
  async execute(
    email: string,
    password: string,
    resetToken: string
  ): Promise<void> {
    const hashPassword = await hashedPassword(password);
    const hashedResetToken = hashedToken(resetToken);

    const admin = await this._adminRepository.findOne({
      resetToken: hashedResetToken,
    });
    // console.log('reset token', resetToken);
    // console.log('hashed reset token', hashedResetToken);

    if (admin) {
      //  console.log('admin found',admin);

      if (!admin.resetTokenExpiry || admin.resetTokenExpiry < new Date()) {
        throw new AppError(
          authMessages.error.PASSWORD_RESETTOKEN_EXPIRED,
          statusCodes.BADREQUEST
        );
      }
      //  console.log('admin', admin);

      await this._adminRepository.updatePassword(admin.id, hashPassword);
      await this._adminRepository.clearResetToken(admin.id);
      return;
    }

    // check user
    const user = await this._userRepository.findOne({
      resetToken: hashedResetToken,
    });
    //console.log('user', user);

    if (!user || !user.id) {
      throw new AppError(
        authMessages.error.USER_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }

    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new AppError(
        authMessages.error.PASSWORD_RESETTOKEN_EXPIRED,
        statusCodes.BADREQUEST
      );
    }

    await this._userRepository.updatePassword(user?.id, hashPassword);
    await this._userRepository.clearResetToken(user.id);
  }
}
