import mongoose from 'mongoose';
import {
  InterviewMode,
  InterviewResult,
} from '../../../domain/enums/interview.enum';
import { InterviewStatusEnum } from '../../../domain/enums/statusEnum';
import { boolean } from 'zod';


export interface IInterviewDocument {
  _id: mongoose.Types.ObjectId;
  scheduledAt: Date;
  candidateId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  mode: InterviewMode;
  jobId: mongoose.Types.ObjectId;
  location: string;
  createdAt:Date,
  updatedAt: Date;
  status: InterviewStatusEnum;
  feedback?: string;

  notes?: string;
  duration:string
  applicationId: mongoose.Types.ObjectId;
  result: InterviewResult;
  meetLink: string;
  isAddlinkLater:boolean
}

export const InterviewSchema = new mongoose.Schema<IInterviewDocument>({
  scheduledAt: { type: Date },
  candidateId: { type: mongoose.Types.ObjectId },
  companyId: { type: mongoose.Types.ObjectId },
  mode: {
    type: String,
    enum: Object.values(InterviewMode),
    default: InterviewMode.OFFLINE,
  },
  jobId: { type: mongoose.Types.ObjectId },
  location: { type: String },
  updatedAt: { type: Date, default: new Date() },
  status: {
    type: String,
    enum: Object.values(InterviewStatusEnum),
    default: InterviewStatusEnum.SCHEDULED,
  },
  feedback: { type: String },
  createdAt:{date:Date},
  notes: { type: String },
  applicationId: { type: mongoose.Types.ObjectId },
  result: { type: String, enum: Object.values(InterviewResult) },
  meetLink: { type: String },
  duration:{type:String},
  isAddlinkLater:{type:Boolean}
})

export const interviewModel = mongoose.model<IInterviewDocument>('Interview', InterviewSchema);
