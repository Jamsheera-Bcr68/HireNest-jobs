import { UserRole } from '../../../domain/enums/userEnums';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { SkillStatusCardDto } from '../../Dtos/skillDto';
import { IAdminRepository } from '../../../domain/repositoriesInterfaces/IAdminRepository';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { AppError } from '../../../domain/errors/AppError';
import { IGetEntitySatusUseCase } from '../../interfaces/usecases/get-entity-status.usecase.interface';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { SkillStatus } from '../../../domain/enums/skillEnum';
import { Skill } from '../../../domain/entities/skill';

export class GetSkillSatusUseCase implements IGetEntitySatusUseCase<SkillStatusCardDto> {
  constructor(
    private skillRepository: ISkillRepository,
    private companyRepository: ICompanyRepository,
    private adminRepository: IAdminRepository
  ) {}
  async execute(userId: string, role: UserRole): Promise<SkillStatusCardDto> {
    let filter: Partial<Skill> = {};
    if (role == UserRole.COMPANY) {
      const company = await this.companyRepository.findByUserId(userId);
      console.log('user is company', company);

      if (!company || !company.id) {
        throw new AppError(
          userMessages.error.COMPANY_NOT_FOUND,
          statusCodes.NOTFOUND
        );
      }
      filter = { createdBy: UserRole.COMPANY, userId };
      const total = await this.skillRepository.count(filter);
      const active = await this.skillRepository.count({
        ...filter,
        status: SkillStatus.APPROVED,
      });

      const rejected = await this.skillRepository.count({
        ...filter,
        status: SkillStatus.REJECTED,
      });
      const pending = await this.skillRepository.count({
        ...filter,
        status: SkillStatus.PENDING,
      });
      const removed = await this.skillRepository.count({
        ...filter,
        status: SkillStatus.REMOVED,
      });

      return {
        total: total,
        active: active,
        pending: pending,
        rejected: rejected,
        removed: removed,
      };
    }

    if (role === UserRole.ADMIN) {
      const admin = await this.adminRepository.findById(userId);
      if (!admin || !admin.id) {
        throw new AppError(
          authMessages.error.ADMIN_NOT_FOUND,
          statusCodes.NOTFOUND
        );
      }
    }
    const total = await this.skillRepository.count(filter);
    const active = await this.skillRepository.count({
      ...filter,
      status: SkillStatus.APPROVED,
    });
    const rejected = await this.skillRepository.count({
      ...filter,
      status: SkillStatus.REJECTED,
    });
    const pending = await this.skillRepository.count({
      ...filter,
      status: SkillStatus.PENDING,
    });
    const removed = await this.skillRepository.count({
      ...filter,
      status: SkillStatus.REMOVED,
    });

    return {
      total: total,
      active: active,
      pending: pending,
      rejected: rejected,
      removed: removed,
    };
  }
}
