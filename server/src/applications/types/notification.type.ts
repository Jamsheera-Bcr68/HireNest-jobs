import { NotificationDto } from '../dtos/notification.dto';

export type NotificationFilterType = {
  isRead?: boolean;
  userId: string;
};

export type NotificationListType = NotificationDto[];
