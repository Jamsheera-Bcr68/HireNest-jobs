import mongoose from 'mongoose';
import { model } from 'mongoose';

export interface IMessageDocument {
  message: string;
  _id: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  recieverId: mongoose.Types.ObjectId;
  chatroomId:mongoose.Types.ObjectId
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema<IMessageDocument>(
  {
    message: { type: String },
    senderId: { type: mongoose.Types.ObjectId },
    recieverId: { type: mongoose.Types.ObjectId },
    chatroomId:{type:mongoose.Types.ObjectId},
    isRead: { type: Boolean,default:false },
  },
  {
    timestamps: true,
  }
);

export const messageModel = model<IMessageDocument>('Message', messageSchema);
