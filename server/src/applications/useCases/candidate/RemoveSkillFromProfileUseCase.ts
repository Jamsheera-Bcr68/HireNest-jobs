import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IRemoveSkillFromProfileUseCase } from '../../interfaces/candidate/IRemoveSkillUseCase';

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
