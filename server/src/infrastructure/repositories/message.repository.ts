import { IMessageRepository } from '../../domain/repository-interfaces/message.repository.interface';
import { GenericRepository } from './generic.repository';
import { Message } from '../../domain/entities/message.entity';
import {
  IMessageDocument,
  messageModel,
} from '../database/models/message.model';
import mongoose from 'mongoose';

export class MessageRepository
  extends GenericRepository<Message, IMessageDocument>
  implements IMessageRepository
{
  constructor() {
    super(messageModel);
  }

  protected mapToEntity(doc: IMessageDocument): Message {
    return {
      id: doc._id.toString(),
      message: doc.message,
      senderId: doc.senderId.toString(),
      recieverId: doc.recieverId.toString(),
      chatroomId: doc.chatroomId.toString(),
      isRead: doc.isRead,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  protected mapToPersistance(
    entity: Partial<Message>
  ): Partial<IMessageDocument> {
    let data: Partial<IMessageDocument> = {};
    if (entity.message) data.message = entity.message;
    if (entity.isRead) data.isRead = entity.isRead;
    if (entity.senderId)
      data.senderId = new mongoose.Types.ObjectId(entity.senderId);

    if (entity.chatroomId)
      data.chatroomId = new mongoose.Types.ObjectId(entity.chatroomId);

    if (entity.recieverId)
      data.recieverId = new mongoose.Types.ObjectId(entity.recieverId);
    if (entity.createdAt) data.createdAt = entity.createdAt;
    if (entity.updatedAt) data.updatedAt = entity.updatedAt;
    return data;
  }

  async findByChatroomId(chatroomId: string): Promise<Message[]> {
    const messages = await this._model.find({
      chatroomId: new mongoose.Types.ObjectId(chatroomId),
    });

    return messages.map((msg) => this.mapToEntity(msg));
  }

  async markAllAsread(chatroomId: string): Promise<void> {
    await this._model.updateMany(
      { chatroomId: new mongoose.Types.ObjectId(chatroomId) },
      { $set: { isRead: true } }
    );
  }

  async getUnreadCount(participantId: string): Promise<number> {
    const unreadCount = await this._model.countDocuments({
      isRead: false,
      recieverId: new mongoose.Types.ObjectId(participantId),
    });
    return unreadCount;
  }
}
