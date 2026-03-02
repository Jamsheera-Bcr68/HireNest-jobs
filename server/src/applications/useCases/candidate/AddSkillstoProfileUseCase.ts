import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IAddSkillToProfileUseCase } from '../../interfaces/candidate/IAddSkilltoProfileUseCase';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';

export class AddSkillsToProfieUseCase implements IAddSkillToProfileUseCase {
  private _userRepository: IUserRepository;
  private _skillRepository: ISkillRepository;
  constructor(
    userRepository: IUserRepository,
    skillRepository: ISkillRepository
  ) {
    this._userRepository = userRepository;
    this._skillRepository = skillRepository;
  }
  async execute(id: string, skillId: string, role: UserRole): Promise<User> {
    console.log('from add skill to profiel usercase');

    const user = await this._userRepository.findById(id);
    if (!user || !user.id || user.role !== role)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);

    const skill = await this._skillRepository.findById(skillId);

    if (!skill)
      throw new AppError(
        userMessages.error.INVALID_SKILL,
        statusCodes.BADREQUEST
      );
    const skillExist = user.skills?.find((skill) => skill.id == skillId);
    if (skillExist) {
      throw new AppError(
        userMessages.error.SKILL_ALREADY_EXIST,
        statusCodes.CONFLICT
      );
    }
    // user.skills?.push(skill);
    // console.log('usr.skills', user.skills);

    const updated = await this._userRepository.addSkill(user.id, skill.id);
    if (!updated)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    console.log('skill updated user for addskillusecase ', updated);

    return updated;
  }
}
