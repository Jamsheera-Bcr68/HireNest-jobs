import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IChangePasswordUsecase } from '../../interfaces/auth/change-password.usecase';
import { hashedPassword } from '../../../infrastructure/services/password-hasher.service';
import { comparePassword } from '../../../infrastructure/services/password-hasher.service';

export class ChangePasswordUsecase implements IChangePasswordUsecase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }
  execute = async (
    userId: string,
    email: string,
    password: string,
    current_password: string
  ): Promise<void> => {
    const user = await this._userRepository.findOne({ email, id: userId });
    //  console.log('user form changepassword');

    if (!user)
      throw new AppError(
        authMessages.error.USER_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    if (!(await comparePassword(current_password, user.password))) {
      throw new AppError(
        authMessages.error.INVALID_PASSWORD,
        statusCodes.BADREQUEST
      );
    }
    const passwordHashed = await hashedPassword(password);
    user.password = passwordHashed;
    await this._userRepository.updatePassword(userId, passwordHashed);
  };
}
