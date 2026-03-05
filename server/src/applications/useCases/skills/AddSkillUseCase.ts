import { Skill } from '../../../domain/entities/skill';
import { SkillStatus } from '../../../domain/enums/skillEnum';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export interface IAddSkillUseCase {
  execute(skill: string, userId: string, role: UserRole): Promise<Skill>;
}

export class AddSkillUseCase implements IAddSkillUseCase {
  constructor(private skillRepository: ISkillRepository) {}
  async execute(skill: string, userId: string, role: UserRole): Promise<Skill> {
    const skills = await this.skillRepository.getAll({});
    const skillExist = skills.find(
      (sk) => sk.skillName.trim().toLowerCase() == skill.trim().toLowerCase()
    );
    if (skillExist && skillExist.status == SkillStatus.APPROVED)
      throw new AppError(
        jobMessages.error.SKILL_ALREADY_EXIST,
        statusCodes.CONFLICT
      );
    else if (skillExist && skillExist.status == SkillStatus.REJECTED)
      throw new AppError(
        jobMessages.error.REJECTED_SKILL,
        statusCodes.BADREQUEST
      );
    else if (skillExist && skillExist.status == SkillStatus.REMOVED)
      throw new AppError(
        jobMessages.error.REEMOVED_SKILL,
        statusCodes.BADREQUEST
      );
    else if (skillExist && skillExist.status == SkillStatus.PENDING)
      return skillExist;

    const newSkill: Partial<Skill> = {
      skillName: skill,
      createdBy: role,
      userId: userId,
    };
    console.log('new skill form usrcase', newSkill);

    const addedSkill = await this.skillRepository.create(newSkill);
    return addedSkill;
  }
}
