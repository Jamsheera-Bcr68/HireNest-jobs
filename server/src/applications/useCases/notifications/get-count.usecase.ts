import { ParsedTypes } from 'zod/v4/core/util.cjs';
import { INotificationRepository } from '../../../domain/repository-interfaces/notification.repository.interface';
import { NotificationFilterType } from '../../types/notification.type';
import { UserRole } from '../../../domain/enums/user.enums';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

export interface IGetNewNotificationCountUsecase {
  execute(userId: string, role: UserRole): Promise<number>;
}

export class GetNewNotificationCountUsecase implements IGetNewNotificationCountUsecase {
  constructor(
    private _notificationRepository: INotificationRepository,
    private _companyRepository: ICompanyRepository
  ) {}

  async execute(userId: string, role: UserRole): Promise<number> {
    let targetedUserId:string


    if (role === UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
      if (!company||!company.id)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company'),
          statusCodes.NOTFOUND
        );
       targetedUserId=company.id
    }else targetedUserId=userId
      
  
   
    const unReadCount = await this._notificationRepository.count(targetedUserId);
    console.log('not read count from usecase is ', unReadCount);

    return unReadCount;
  }
}
