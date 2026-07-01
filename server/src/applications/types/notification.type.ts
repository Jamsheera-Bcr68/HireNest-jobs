import { ApplicationStatusEnum } from '../../domain/enums/status.enum';
import { NotificationDto } from '../dtos/notification.dto';

export type NotificationFilterType = {
  isRead?: boolean;
  userId: string;
};

export type NotificationListType = NotificationDto[];

export const notificationTitleTypes={
APP_STATUS_UPDATED:(status:ApplicationStatusEnum)=>`Application ${status}`
}