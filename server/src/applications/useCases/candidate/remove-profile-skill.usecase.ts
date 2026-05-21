import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IRemoveSkillFromProfileUseCase } from '../../interfaces/candidate/remove-skill.usecase';

export class RemoveSkillFromProfileUseCase implements IRemoveSkillFromProfileUseCase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }
  async execute(
    userId: string,
    skillId: string,
    role: UserRole
  ): Promise<User> {
    const user = await this._userRepository.findById(userId);
    if (!user || user?.role !== role || !user.id)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);

    user.skills = user.skills?.filter((skill) => skill.id !== skillId);
    const updated = await this._userRepository.removeSkill(userId, skillId);
    if (!updated)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    return updated;
  }
}
