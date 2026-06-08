import mongoose, { mongo } from 'mongoose';
import { NotificationType } from '../../../domain/enums/notification-enums';
export interface INotificationDocument {
    _id:mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId;
  message: string;
  title: string;
  createdAt: Date;
  isRead: boolean;
  type: NotificationType;
}

const NotificationSchema = new mongoose.Schema<INotificationDocument>({
  userId: { type: mongoose.Types.ObjectId },
  message: { type: String },
  title: { type: String },

  isRead: { type: Boolean, default: false },
  type: { type: String, enum: Object.values(NotificationType) },
  createdAt: { type: Date, default: new Date() },
});

export const notificationModel = mongoose.model<INotificationDocument>(
  'Notification',
  NotificationSchema
);
