import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IExperienseRepository } from '../../../domain/repository-interfaces/experience-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IRemoveExperienceUseCase } from '../../interfaces/candidate/remove-experience.usecase';

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
