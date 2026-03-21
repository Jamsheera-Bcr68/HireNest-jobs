import { User } from '../../../domain/entities/User';
import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { adminMessages } from '../../../shared/constants/messages/adminMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export interface IAdminUpdateCandidateUseCase {
  execute(id: string, data: Partial<User>): Promise<User>;
}

export class AdminUpdateCandidateUseCase implements IAdminUpdateCandidateUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(id: string, data: Partial<User>): Promise<User> {
    const candidate = await this.userRepository.findById(id);
    if (!candidate) {
      throw new AppError(
        adminMessages.error.CANDIDATE_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }
    const updated = await this.userRepository.save(id, {
      ...candidate,
      ...data,
    });
    if (!updated) {
      throw new AppError(
        adminMessages.error.CANDIDATE_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }
    return updated;
  }
}
