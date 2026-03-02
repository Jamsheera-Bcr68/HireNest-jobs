import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IExperienseRepository } from '../../../domain/repositoriesInterfaces/IExperienceRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IRemoveExperienceUseCase } from '../../interfaces/candidate/IRemoveExperienceUseCase';

export class RemoveExperienceUseCase implements IRemoveExperienceUseCase {
  private _experienceRepository: IExperienseRepository;
  private _userRepository: IUserRepository;
  constructor(
    experienceRepository: IExperienseRepository,
    userRepository: IUserRepository
  ) {
    this._experienceRepository = experienceRepository;
    this._userRepository = userRepository;
  }
  async execute(userId: string, role: UserRole, expId: string): Promise<User> {
    const user = await this._userRepository.findById(userId);
    if (!user || !user.id || user.role !== role) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    await this._experienceRepository.deleteById(expId);
    const updated = await this._userRepository.removeExperience(userId, expId);

    if (!updated)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    return updated;
  }
}
