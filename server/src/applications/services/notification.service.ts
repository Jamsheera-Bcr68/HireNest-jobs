import { Notification } from '../../domain/entities/notification.entity';
import { INotificationRepository } from '../../domain/repository-interfaces/notification.repository.interface';

export interface INotificationService {
  create(data: Partial<Notification>): Promise<void>;
}

export class NotificationService implements INotificationService {
  constructor(
    private _notificationRepository: INotificationRepository
  ) {}

  async create(data: Partial<Notification>): Promise<void> {
    const notification = await this._notificationRepository.create(data);
    console.log('new notification is ',notification);
    
  }
}
