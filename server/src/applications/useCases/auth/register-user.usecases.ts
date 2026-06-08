import { IRegisterUseCase } from '../../interfaces/auth/user-register.usecase';
import { IRegisterInput, IRegisterOutput } from '../../dtos/register.types';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { hashedPassword } from '../../../infrastructure/services/password-hasher.service';
import { User } from '../../../domain/entities/user.entity';
import { AppError } from '../../../domain/errors/app-error';

export class RegisterUseCase implements IRegisterUseCase {
  private _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }
  async execute(request: IRegisterInput): Promise<IRegisterOutput> {
    const userExist = await this._userRepository.findByEmail(request.email);
    if (userExist && userExist.isVerified) {
      throw new AppError(authMessages.error.CONFLICT, statusCodes.CONFLICT);
    } else if (userExist) {
      return userExist;
    }

    const password = await hashedPassword(request.password);
    const user = new User(
      request.email,
      password,
      request.phone,
      new Date(),
      new Date(),
      false,
      false,
      []
    );

    const savedUser = await this._userRepository.createUser(user);

    // console.log('pending user from registerusecase', user);

    return savedUser;
  }
}
