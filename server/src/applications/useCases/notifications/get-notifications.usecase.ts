import { IGetAllEntitiesUsecase } from '../../interfaces/usecases/get-all-entities.usecase.interface';
import { NotificationDto } from '../../dtos/notification.dto';
import {
  NotificationFilterType,
  NotificationListType,
} from '../../types/notification.type';
import { INotificationRepository } from '../../../domain/repository-interfaces/notification.repository.interface';
import { NotificationMapper } from '../../mappers/notification.mapper';
import { UserRole } from '../../../domain/enums/user.enums';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

export class GetNotificationsUsecase implements IGetAllEntitiesUsecase<
  NotificationListType,
  NotificationFilterType
> {
  constructor(private _notificationRepository: INotificationRepository,private _companyRepository:ICompanyRepository) {}

  async execute(
    filter: Partial<NotificationFilterType>,
    role: UserRole
  ): Promise<NotificationDto[]> {
  //  console.log('filter from usecase', filter);
let targettedUserId:string
const {userId,isRead}=filter
if(!userId)throw new AppError(generalMessages.errors.ID_NOT_FOUND('Candidate'),statusCodes.BADREQUEST)
if(role===UserRole.COMPANY){
  const company=await this._companyRepository.findByUserId(userId)
  if(!company||!company.id)throw new AppError(generalMessages.errors.NOT_FOUND('Company'),statusCodes.NOTFOUND)
  targettedUserId=company.id

}else targettedUserId=userId

    const notifications = await this._notificationRepository.getAll({isRead,userId:targettedUserId});

    return notifications.map((n) => NotificationMapper.toNotificationDto(n));
  }
}
