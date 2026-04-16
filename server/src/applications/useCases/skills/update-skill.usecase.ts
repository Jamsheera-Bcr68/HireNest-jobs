import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IAdminRepository } from '../../../domain/repositoriesInterfaces/IAdminRepository';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { skillMessages } from '../../../shared/constants/messages/skill.messages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { SkillStatus } from '../../../domain/enums/skillEnum';
import { IUpdateEntityUseCase } from '../../interfaces/usecases/update-entity.usecase.interface';
import { Skill } from '../../../domain/entities/skill';

export class UpdateSkillUsecase implements IUpdateEntityUseCase<
  { skill: string },
  void
> {
  constructor(
    private skillRepository: ISkillRepository,
    private adminRepository: IAdminRepository
  ) {}
  async execute(
    id: string,
    role: UserRole,
    userId: string,
    data: { skill: string }
  ): Promise<void> {
    const skillExist = await this.skillRepository.findById(id);
    if (!skillExist)
      throw new AppError(
        skillMessages.error.SKILL_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    //new
    if (role === UserRole.COMPANY) {
      if (skillExist.userId !== userId) {
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      }
      if (skillExist.status !== SkillStatus.PENDING) {
        throw new AppError(
          skillMessages.error.SKILL_EDIT_NOT_ALLOWED,
          statusCodes.BADREQUEST
        );
      }
    } else if (role == UserRole.ADMIN) {
      const admin = await this.adminRepository.findById(userId);
      if (!admin)
        throw new AppError(
          authMessages.error.ADMIN_NOT_FOUND,
          statusCodes.NOTFOUND
        );
    } else {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }
    //new

    const { skill } = data;
    const skillNameExist = await this.skillRepository.findBySkillName(skill);

    // if (skillNameExist && skillNameExist.status == SkillStatus.APPROVED)
    if (
      skillNameExist &&
      skillNameExist.id !== id &&
      skillNameExist.status === SkillStatus.APPROVED
    )
      throw new AppError(
        skillMessages.error.SKILL_ALREADY_EXIST,
        statusCodes.CONFLICT
      );
    if (
      skillNameExist &&
      skillNameExist.id !== id &&
      skillNameExist.status === SkillStatus.PENDING
    ) {
      throw new AppError(
        skillMessages.error.SKILL_ALREADY_EXIST_PENDING,
        statusCodes.CONFLICT
      );
    }
    let updateData = { skillName: skill } as Partial<Skill>;
    if (skillExist.status === SkillStatus.PENDING && role == UserRole.ADMIN) {
      updateData.status = SkillStatus.APPROVED;
    }
    await this.skillRepository.update(id, updateData);
  }
}
