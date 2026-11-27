import { IAttachment } from '../../domain/entities/message.entity';

export interface MessageDto {
  id?: string;
  sender: 'user' | 'participant';
  reciever: 'user' | 'participant';
  message: string;
  attachments: IAttachment[];
  sendTime: string;
}

export interface MessageFilterDto {
  chatroomId?: string;
}
