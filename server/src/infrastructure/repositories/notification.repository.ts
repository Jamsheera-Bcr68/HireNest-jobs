import { GenericRepository } from './generic.repository';
import { Notification } from '../../domain/entities/notification.entity';
import { INotificationRepository } from '../../domain/repository-interfaces/notification.repository.interface';
import {
  INotificationDocument,
  notificationModel,
} from '../database/models/notification.model';
import mongoose, { Types } from 'mongoose';
import { NotificationFilterType } from '../../applications/types/notification.type';

export class NotificationRepository
  extends GenericRepository<Notification, INotificationDocument>
  implements INotificationRepository
{
  constructor() {
    super(notificationModel);
  }

  protected mapToEntity(doc: INotificationDocument): Notification {
  //  console.log('doc notifications', doc);

    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      title: doc.title,
      message: doc.message,
      createdAt: doc.createdAt.toString(),
      isRead: doc.isRead,
      type: doc.type,
    };
  }

  async count(userId: string): Promise<number> {
    const count = await this._model.countDocuments({
      userId: new Types.ObjectId(userId),
      isRead: false,
    });
    return count;
  }

  async markAsRead(id: string): Promise<Notification | null> {
    const updated = await this._model.findByIdAndUpdate(
      id,
      {
        $set: { isRead: true },
      },
      { new: true }
    );
    if (!updated) return null;
    return this.mapToEntity(updated);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this._model.updateMany(
      { userId: new mongoose.Types.ObjectId(userId) },
      { $set: { isRead: true } }
    );
  }

  async deleteNotification(notificationId: string): Promise<void> {
    await this._model.findByIdAndDelete(notificationId);
  }
  
  protected mapToPersistance(
    entity: Partial<Notification>
  ): Partial<INotificationDocument> {
    const data: Partial<INotificationDocument> = {};
  //  console.log('mapToPersistance', entity);

    if (entity.userId) data.userId = new mongoose.Types.ObjectId(entity.userId);
    if (entity.message) data.message = entity.message;
    if (entity.title) data.title = entity.title;
    if (entity.createdAt) data.createdAt = new Date(entity.createdAt);
    if (entity.isRead == false) data.isRead = false;
    if (entity.isRead == true) data.isRead = true;
    if (entity.type) data.type = entity.type;
   // console.log('data', data);

    return data;
  }
}
