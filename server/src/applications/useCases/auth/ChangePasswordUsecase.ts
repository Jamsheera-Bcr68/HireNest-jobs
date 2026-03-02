import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IChangePasswordUsecase } from '../../interfaces/auth/IChangePasswordUsecase';
import { hashedPassword } from '../../../infrastructure/services/passwordHasher';
import { comparePassword } from '../../../infrastructure/services/passwordHasher';

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
    console.log('user form changepassword');

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
    await this._userRepository.updatePassword(user.email, passwordHashed);
  };
}
