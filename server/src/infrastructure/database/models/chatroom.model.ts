import mongoose, { model } from 'mongoose';

export interface IChatroomDocument {
  _id: mongoose.Types.ObjectId;

  companyId: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  lastMessageId?: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const chatroomSchema = new mongoose.Schema<IChatroomDocument>(
  {
    companyId: { type: mongoose.Types.ObjectId, ref: 'Company' },
    candidateId: { type: mongoose.Types.ObjectId, ref: 'User' },
    jobId: { type: mongoose.Types.ObjectId, ref: 'Job' },
    lastMessageId: { type: mongoose.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

export const chatroomModel = model<IChatroomDocument>(
  'Chatroom',
  chatroomSchema
);
