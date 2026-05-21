import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IGetUserUseCase } from '../../interfaces/user/get-user-data.usecase';

export class GetUserUseCase implements IGetUserUseCase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  async execute(userId: string, role: UserRole): Promise<User> {
    const user = await this._userRepository.findById(userId);
    if (!user || user.role !== role)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    console.log('user from getuser ', user);

    return user;
  }
}
