import { Notification } from '../../domain/entities/notification.entity';
import { NotificationDto } from '../dtos/notification.dto';

export class NotificationMapper {
  static toNotificationDto(entity: Notification): NotificationDto {
    return {
        id:entity.id,
      title: entity.title,
      isRead: entity.isRead,
      message: entity.message,
      time: new Date(entity.createdAt).toDateString(),
    };
  }
}
