import { Skill } from '../../../domain/entities/skill';
import { SkillStatus } from '../../../domain/enums/skillEnum';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { IAdminRepository } from '../../../domain/repositoriesInterfaces/IAdminRepository';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { skillMessages } from '../../../shared/constants/messages/skill.messages';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { UserSkillDto } from '../../Dtos/skillDto';

export interface IAddSkillUseCase {
  execute(skill: string, userId: string, role: UserRole): Promise<UserSkillDto>;
}

export class AddSkillUseCase implements IAddSkillUseCase {
  constructor(
    private skillRepository: ISkillRepository,
    private adminRepository: IAdminRepository,
    private companyRepository: ICompanyRepository
  ) {}
  async execute(
    skill: string,
    userId: string,
    role: UserRole
  ): Promise<UserSkillDto> {
    if (role == UserRole.ADMIN) {
      const admin = await this.adminRepository.findById(userId);
      if (!admin)
        throw new AppError(
          authMessages.error.ADMIN_NOT_FOUND,
          statusCodes.NOTFOUND
        );
    } else if (role == UserRole.COMPANY) {
      const company = await this.companyRepository.findByUserId(userId);
      if (!company)
        throw new AppError(
          userMessages.error.COMPANY_NOT_FOUND,
          statusCodes.NOTFOUND
        );
    }
    const skillExist = await this.skillRepository.findBySkillName(
      skill.trim().toLowerCase()
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
    else if (skillExist && skillExist.status == SkillStatus.PENDING) {
      if (role == UserRole.ADMIN) {
        throw new AppError(
          skillMessages.error.SKILL_ALREADY_EXIST_PENDING,
          statusCodes.CONFLICT
        );
      } else if (role == UserRole.COMPANY) {
        return skillExist;
      }
    }

    const newSkill: Partial<Skill> = {
      skillName: skill,
      createdBy: role,
      reviewedAt: role === UserRole.ADMIN ? new Date() : undefined,
      status:
        role === UserRole.ADMIN ? SkillStatus.APPROVED : SkillStatus.PENDING,
      userId: userId,
      createdAt: new Date(),
    };
    console.log('new skill form usrcase', newSkill);

    const addedSkill = await this.skillRepository.create(newSkill);
    return addedSkill;
  }
}
