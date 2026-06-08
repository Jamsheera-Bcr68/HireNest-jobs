import { IBaseRepository } from './base-repository.interface';
import { Notification } from '../entities/notification.entity';

export interface INotificationRepository extends IBaseRepository<Notification> {
  count(userId: string): Promise<number>;
  markAsRead(id: string): Promise<Notification|null>;
  markAllAsRead(userId: string): Promise<void>;
  deleteNotification(notificationId:string):Promise<void>
}
