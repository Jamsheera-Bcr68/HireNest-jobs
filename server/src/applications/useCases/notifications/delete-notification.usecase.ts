import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { INotificationRepository } from '../../../domain/repository-interfaces/notification.repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

export interface IDeleteNotificationUsecase {
  execute(notificationId: string, userId: string,role:UserRole): Promise<void>;
}

export class DeleteNotificationUsecase implements IDeleteNotificationUsecase {
  constructor(
    private _notificationRepository: INotificationRepository,
    private _companyRepository: ICompanyRepository
  ) {}

  async execute(notificationId: string, userId: string,role:UserRole): Promise<void> {
    const notification =
      await this._notificationRepository.findById(notificationId);
    if (!notification)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Notification'),
        statusCodes.NOTFOUND
      );
    let targettedUserId: string;

    if (role === UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
      if (!company || !company.id)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company'),
          statusCodes.NOTFOUND
        );
      targettedUserId = company.id;
    } else targettedUserId = userId;
    if (notification.userId !== targettedUserId)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    await this._notificationRepository.deleteNotification(notificationId);
  }
}
