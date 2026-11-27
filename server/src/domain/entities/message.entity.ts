import { FileType } from '../enums/file-type.enum';
export interface Message {
  id?: string;
  attachments: IAttachment[];
  senderId: string;
  recieverId: string;
  isRead: boolean;
  chatroomId: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
}

export interface IAttachment {
  key: string;
  name: string;
  mimeType: string;
  size: number;
  kind: FileType;
}
