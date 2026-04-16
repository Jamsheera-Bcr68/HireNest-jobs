import { Skill } from '../../../domain/entities/skill';
import { UserRole } from '../../../domain/enums/userEnums';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { AppError } from '../../../domain/errors/AppError';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { skillMessages } from '../../../shared/constants/messages/skill.messages';
import { IUpdateEntityStatusUseCase } from '../../interfaces/usecases/update-entity-status.usecase.interface';

import { IAdminRepository } from '../../../domain/repositoriesInterfaces/IAdminRepository';

import { SkillStatus } from '../../../domain/enums/skillEnum';

export class UpdateSkillStatusUseCase implements IUpdateEntityStatusUseCase<
  Skill,
  SkillStatus
> {
  constructor(
    private skillRepository: ISkillRepository,
    private adminRepository: IAdminRepository
  ) {}
  async execute(
    id: string,
    userId: string,
    role: UserRole,
    status: SkillStatus,
    reason?: string
  ): Promise<void> {
    console.log('from usecase', id, userId, role, status, reason);

    const skill = await this.skillRepository.findById(id);
    if (!skill || !skill.id)
      throw new AppError(
        jobMessages.error.SKILL_NOT_FOUND,
        statusCodes.NOTFOUND
      );

    if (role === UserRole.COMPANY) {
      if (skill.userId !== userId) {
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      }
      if (skill.status !== SkillStatus.PENDING) {
        throw new AppError(
          skillMessages.error.SKILL_EDIT_NOT_ALLOWED,
          statusCodes.BADREQUEST
        );
      }
      if (status !== SkillStatus.REMOVED) {
        throw new AppError(
          skillMessages.error.SKILL_REMOVE_NOT_ALLOWED,
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

    const data = { status: status } as Partial<Skill>;
    if (status === SkillStatus.REJECTED) {
      data.reasonForReject = reason;
      data.reviewedAt = new Date();
    } else if (status == SkillStatus.REMOVED && role == UserRole.ADMIN)
      data.reasonForRemove = reason;

    if (status === SkillStatus.APPROVED) {
      data.reviewedAt = new Date();
    }
    await this.skillRepository.update(id, data);
  }
}
