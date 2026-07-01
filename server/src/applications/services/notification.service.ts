import { Notification } from '../../domain/entities/notification.entity';
import { INotificationRepository } from '../../domain/repository-interfaces/notification.repository.interface';
import { NotificationDto } from '../dtos/notification.dto';
import { NotificationMapper } from '../mappers/notification.mapper';

export interface INotificationService {
  create(data: Partial<Notification>): Promise<NotificationDto>;
}

export class NotificationService implements INotificationService {
  constructor(
    private _notificationRepository: INotificationRepository
  ) {}

  async create(data: Partial<Notification>): Promise<NotificationDto> {
    const notification = await this._notificationRepository.create(data);
   // console.log('new notification is ',notification);
    return NotificationMapper.toNotificationDto(notification)
  }
}
