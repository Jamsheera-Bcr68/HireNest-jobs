import mongoose, { Model, model } from 'mongoose';
import { string } from 'zod';

export interface IChatroomDocument {
  _id: mongoose.Types.ObjectId;

  companyId: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  lastMessage?: string;
  lastMessagedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const chatroomSchema = new mongoose.Schema<IChatroomDocument>(
  {
    companyId: { type: mongoose.Types.ObjectId, ref: 'Company' },
    candidateId: { type: mongoose.Types.ObjectId, ref: 'User' },
    jobId: { type: mongoose.Types.ObjectId,ref:'Job' },
    lastMessage: { type: String },
    lastMessagedAt: { type: Date},
  },
  {
    timestamps: true,
  }
);

export const chatroomModel = model<IChatroomDocument>(
  'Chatroom',
  chatroomSchema
);
