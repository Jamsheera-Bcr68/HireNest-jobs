import { NotificationType } from '../enums/notification-enums';

export interface Notification {
  id: string;
  userId: string;
  message: string;
  title: string;
  createdAt: string;
  isRead: boolean;
  type: NotificationType;
}
