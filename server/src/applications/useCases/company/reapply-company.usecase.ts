import { NotificationType } from '../../../domain/enums/notification-enums';
import { StatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IAdminRepository } from '../../../domain/repository-interfaces/admin.reporitory.interface';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { notificationMessages } from '../../../shared/constants/messages/notification.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { companyDto } from '../../dtos/company.dto';
import { NotificationInputDto } from '../../dtos/notification.dto';
import { INotificationService } from '../../services/notification.service';
import { Company } from '../../../domain/entities/company.entity';

export interface IReApplyCompanyUsecase {
  execute(payload: Partial<companyDto>, userId: string): Promise<void>;
}

export class ReApplyCompanyUsecase implements IReApplyCompanyUsecase {
  constructor(
    private _comapnyRepository: ICompanyRepository,
    private _adminRepository: IAdminRepository,
    private _notificationService: INotificationService
  ) {}

  async execute(payload: Partial<Company>, userId: string): Promise<void> {
    const company = await this._comapnyRepository.findByUserId(userId);
 console.log('payload fromupdatae ompay',payload);
    if (!company || !company.id)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );

    if (company.reapplyCount == 3)
      throw new AppError(
        generalMessages.errors.REAPPLY_COUNT_LIMIT_EXEEDED,
        statusCodes.BADREQUEST
      );

    const updated: Partial<Company> = {
      ...payload,
      status: StatusEnum.PENDING,
      reapplyCount: company.reapplyCount + 1,
      reapplyDetails: [
        ...company.reapplyDetails,
        {
          status: StatusEnum.PENDING,
          date: new Date(),
        },
      ],
    };
 console.log('updated fromupdatae usecase',updated);
    await this._comapnyRepository.save(company.id, updated);

    const admin = await this._adminRepository.findOne({ role: UserRole.ADMIN });
    if (!admin || !admin.id)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Admin'),
        statusCodes.NOTFOUND
      );
    const notificationData: NotificationInputDto = {
      type: NotificationType.COMPANY_REAPPLY_RECIEVED,
      title: 'Compnay Re Applicaition recieved',
      message: notificationMessages[NotificationType.COMPANY_REAPPLY_RECIEVED]({
        companyName: company.companyName,
      }),
      userId: admin.id,
    };
    await this._notificationService.create(notificationData);
  }
}
