import { Company } from '../../../domain/entities/company.entity';
import { NotificationType } from '../../../domain/enums/notification-enums';
import { StatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { adminMessages } from '../../../shared/constants/messages/admin.messages';
import { notificationMessages } from '../../../shared/constants/messages/notification.messages';
import { getIO } from '../../../infrastructure/socket';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { NotificationInputDto } from '../../dtos/notification.dto';
import { INotificationService } from '../../services/notification.service';

export interface IAdminUpdateCompanyUseCase {
  execute(
    id: string,
    data: Partial<Company>,
    reason?: string
  ): Promise<Company>;
}

export class AdminUpdateCompanyUseCase implements IAdminUpdateCompanyUseCase {
  constructor(
    private _companyRepository: ICompanyRepository,
    private _userRepository: IUserRepository,
    private _notificationService: INotificationService
  ) {}
  async execute(
    id: string,
    data: Partial<Company>,
    reason?: string
  ): Promise<Company> {
    const company = await this._companyRepository.findById(id);
   // console.log('reason', reason);

    if (!company || !company.id) {
      throw new AppError(
        adminMessages.error.COMPANY_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }

    const { status } = data;
    if (!status) return company;


    
    if (status == 'rejected') {
      data.reasonForReject = reason;
    }
    if (status == 'suspended') {
      data.reasonForSuspend = reason;
    }
    if (company.reapplyCount && status == 'rejected') {
     // console.log('reapply details', company.reapplyDetails);

      data.reapplyDetails = company.reapplyDetails.map((app) =>
        app.status == StatusEnum.PENDING
          ? { ...app, status: StatusEnum.REJECTED, rejectedReason: reason }
          : app
      );
    }
    if (company.reapplyCount && status == 'active') {
    //  console.log('reapply details', company.reapplyDetails);

      data.reapplyDetails = company.reapplyDetails.map((app) =>
        app.status == StatusEnum.PENDING
          ? { ...app, status: StatusEnum.ACTIVE }
          : app
      );
    }
    const updated = await this._companyRepository.save(id, {
      ...company,
      ...data,
    });
    if (!updated) {
      throw new AppError(
        adminMessages.error.COMPANY_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }

    const userId = company.userId;
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new AppError(
        adminMessages.error.CANDIDATE_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }

    let requests = user.companyRequests;

    if (status === 'rejected') {
      requests = user.companyRequests.map((req) =>
        req.companyId !== company.id
          ? req
          : { ...req, status: StatusEnum.REJECTED, reasonForReject: reason }
      );

      await this._userRepository.save(userId, {
        companyRequests: requests,
      });
    } else if (
      status === 'active' &&
      data.isVerified === true &&
      company.status === 'pending'
    ) {
      requests = user.companyRequests.map((req) =>
        req.companyId !== company.id
          ? req
          : { ...req, status: StatusEnum.ACTIVE }
      );
      await this._userRepository.save(userId, {
        role: UserRole.COMPANY,
        companyRequests: requests,
      });
    }
    let not_type: NotificationType | null = null;

    switch (status) {
      case StatusEnum.ACTIVE:
        not_type = NotificationType.COMPANY_REVIEW_COMPLETED;
        break;
      case StatusEnum.REJECTED:
        not_type = NotificationType.COMPANY_REVIEW_COMPLETED;
        break;
      case StatusEnum.SUSPENDED:
        not_type = NotificationType.COMPANY_SUSPENDED;
        break;
    }

    if (!not_type) return updated;

    const notificationData: NotificationInputDto = {
      title:
        status == StatusEnum.SUSPENDED
          ? 'Company Suspended'
          : 'Company Registration Review Completed',
      message: notificationMessages[NotificationType.COMPANY_REVIEW_COMPLETED]({
        status,
        reason,
      }),
      type: not_type,
      userId: company.userId,
    };

    const notification =
      await this._notificationService.create(notificationData);
    getIO().to(company.userId).emit('notification', notification);
    return updated;
  }
}
