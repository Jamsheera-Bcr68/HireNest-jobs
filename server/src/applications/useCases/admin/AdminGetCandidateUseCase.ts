import { User } from '../../../domain/entities/User';
import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { adminMessages } from '../../../shared/constants/messages/adminMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { userDto } from '../../Dtos/userDto';

export interface IAdminGetEntityUseCase {
  execute(id: string): Promise<User>;
}

export class AdminGetEntityUseCase implements IAdminGetEntityUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(id: string): Promise<User> {
    const candidate = await this.userRepository.findById(id);
    if (!candidate)
      throw new AppError(
        adminMessages.error.CANDIDATE_NOTFOUND,
        statusCodes.NOTFOUND
      );
    return candidate;
  }
}
