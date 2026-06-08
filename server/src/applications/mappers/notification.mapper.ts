import { Notification } from '../../domain/entities/notification.entity';
import { NotificationDto } from '../dtos/notification.dto';
import { notificationMessages } from '../../shared/constants/messages/notification.messages';
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
