import { User } from '../../../domain/entities/user.entity';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { adminMessages } from '../../../shared/constants/messages/admin.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

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
