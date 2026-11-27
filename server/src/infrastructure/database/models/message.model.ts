import mongoose from 'mongoose';
import { model } from 'mongoose';
import { IAttachment } from '../../../domain/entities/message.entity';
import { FileType } from '../../../domain/enums/file-type.enum';

export interface IMessageDocument {
  text: string;
  attachments: IAttachment[];
  _id: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  recieverId: mongoose.Types.ObjectId;
  chatroomId: mongoose.Types.ObjectId;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema<IMessageDocument>(
  {
    text: { type: String },
    attachments: {
      type: [
        {
          key: String,
          name: String,
          mimeType: String,
          size: Number,
          kind: { type: String, enum: Object.values(FileType) },
        },
      ],
      default: [],
    },
    senderId: { type: mongoose.Types.ObjectId },
    recieverId: { type: mongoose.Types.ObjectId },
    chatroomId: { type: mongoose.Types.ObjectId },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const messageModel = model<IMessageDocument>('Message', messageSchema);
