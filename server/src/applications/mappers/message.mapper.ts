import { MessageDto } from '../dtos/messages.dto';
import { Message } from '../../domain/entities/message.entity';
import { getTime } from '../../shared/utils';

export class MessageMapper {
 static toMessageDto(message: Message, currentUserId: string): MessageDto {
    return {
      id: message.id,
      message: message.message,
      sender: message.senderId == currentUserId ? 'user' : 'participant',
      reciever: message.recieverId == currentUserId ? 'user' : 'participant',
      sendTime:getTime(message.createdAt)
    };
  }
}
