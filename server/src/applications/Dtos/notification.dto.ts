import { NotificationType } from '../../domain/enums/notification-enums';


export interface NotificationDto {
  id: string;
  message: string;
  title: string;
  isRead: boolean;
  time: string;
}

export interface NotificationInputDto {
  userId: string;
  type: NotificationType;
  message: string;
  title: string;
}
