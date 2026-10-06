import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IAddSkillToProfileUseCase } from '../../interfaces/candidate/add-skill-profile.usecase';
import { ISkillRepository } from '../../../domain/repository-interfaces/skill-repository.interface';
import { CandidateSkillDto } from '../../dtos/skill.dto';

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
  async execute(
    id: string,
    skillId: string,
    role: UserRole
  ): Promise<CandidateSkillDto> {
    //   console.log('from add skill to profiel usercase');

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

    await this._userRepository.addSkill(user.id, skill.id);

    return skill;
  }
}
