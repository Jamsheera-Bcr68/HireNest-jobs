import { IRegisterUseCase } from '../../interfaces/auth/IUserRegisterUseCase';
import { IRegisterInput, IRegisterOutput } from '../../Dtos/registerTypes';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { hashedPassword } from '../../../infrastructure/services/passwordHasher';
import { User } from '../../../domain/entities/User';
import { AppError } from '../../../domain/errors/AppError';

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
    const user = new User(request.email, password, request.phone, false);

    const savedUser = await this._userRepository.createUser(user);

    console.log('pending user from registerusecase', user);

    return savedUser;
  }
}
