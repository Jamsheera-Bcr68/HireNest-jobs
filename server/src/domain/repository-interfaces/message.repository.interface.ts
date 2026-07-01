import { IBaseRepository } from './base-repository.interface';
import { Message } from '../entities/message.entity';

export interface IMessageRepository extends IBaseRepository<Message> {
  findByChatroomId(chatroomId: string): Promise<Message[]>;
  markAllAsread(chatroomId: string): Promise<void>;
  getUnreadCount(participantId: string): Promise<number>
}
