import { Skill } from '../../../domain/entities/skill.entity';
import { SkillStatus } from '../../../domain/enums/skill.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IAdminRepository } from '../../../domain/repository-interfaces/admin.reporitory.interface';
import { ISkillRepository } from '../../../domain/repository-interfaces/skill-repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { jobMessages } from '../../../shared/constants/messages/job.messages';
import { skillMessages } from '../../../shared/constants/messages/skill.messages';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { UserSkillDto } from '../../dtos/skill.dto';
import { INotificationService } from '../../services/notification.service';
import { NotificationType } from '../../../domain/enums/notification-enums';
import { Notification } from '../../../domain/entities/notification.entity';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { notificationMessages } from '../../../shared/constants/messages/notification.messages';
import { getIO } from '../../../infrastructure/socket';
import { NotificationInputDto } from '../../dtos/notification.dto';

export interface IAddSkillUseCase {
  execute(skill: string, userId: string, role: UserRole): Promise<UserSkillDto>;
}

export class AddSkillUseCase implements IAddSkillUseCase {
  constructor(
    private _skillRepository: ISkillRepository,
    private _adminRepository: IAdminRepository,
    private _companyRepository: ICompanyRepository,
    private _notificationService: INotificationService
  ) {}
  async execute(
    skill: string,
    userId: string,
    role: UserRole
  ): Promise<UserSkillDto> {
    if (role == UserRole.ADMIN) {
      const admin = await this._adminRepository.findById(userId);
      if (!admin)
        throw new AppError(
          authMessages.error.ADMIN_NOT_FOUND,
          statusCodes.NOTFOUND
        );
    } else if (role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
      if (!company)
        throw new AppError(
          userMessages.error.COMPANY_NOT_FOUND,
          statusCodes.NOTFOUND
        );
    }
    const skillExist = await this._skillRepository.findBySkillName(
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
    console.log('new skill form usecase', newSkill);

    if (role === UserRole.COMPANY) {
      const admin = await this._adminRepository.findOne({
        role: UserRole.ADMIN,
      });
      if (!admin)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Admin'),
          statusCodes.NOTFOUND
        );
      const notificationData: NotificationInputDto = {
        userId: admin.id,
        type: NotificationType.SKILL_APPROVAL_REQUEST,
        message: notificationMessages[NotificationType.SKILL_APPROVAL_REQUEST]({
          skillName: skill,
        }),
        title: 'New Skill Request Recieved',
      };

      await this._notificationService.create(notificationData);
      getIO().to(admin.id).emit('notification',notificationData)
    }

    const addedSkill = await this._skillRepository.create(newSkill);

    return addedSkill;
  }
}
