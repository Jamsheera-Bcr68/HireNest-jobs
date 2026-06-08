import { User } from '../../../domain/entities/user.entity';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { adminMessages } from '../../../shared/constants/messages/admin.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { userDto } from '../../dtos/user.dto';

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
