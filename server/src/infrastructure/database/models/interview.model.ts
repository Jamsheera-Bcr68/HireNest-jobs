import mongoose from 'mongoose';
import {
  InterviewMode,
  InterviewResult,
} from '../../../domain/enums/interview.enum';
import { InterviewStatusEnum } from '../../../domain/enums/status.enum';
import { boolean } from 'zod';
import { UserRole } from '../../../domain/enums/user.enums';

export interface IInterviewDocument {
  _id: mongoose.Types.ObjectId;
  scheduledAt: Date;
  candidateId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  mode: InterviewMode;
  jobId: mongoose.Types.ObjectId;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  status: InterviewStatusEnum;
  feedback?: string;

  notes?: string;
  duration: string;
  applicationId: mongoose.Types.ObjectId;
  result: InterviewResult;
  meetLink: string;
  isAddlinkLater: boolean;
  isRescheduleRequested: boolean;
  reasonForRescheduleRequest: string;
  isConfirmed: boolean;
  reasonForCancel?: string;
  cancelledBy: UserRole;
  score: number;
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
  cancelledBy: { type: String, enum: Object.values(UserRole) },
  score: { type: Number },
  feedback: { type: String },
  createdAt: { type: Date },
  notes: { type: String },
  applicationId: { type: mongoose.Types.ObjectId },
  result: { type: String, enum: Object.values(InterviewResult) },
  meetLink: { type: String },
  duration: { type: String },
  isAddlinkLater: { type: Boolean },
  isConfirmed: { type: Boolean, default: false },
  isRescheduleRequested: { type: Boolean, default: false },
  reasonForCancel: { type: String },
  reasonForRescheduleRequest: { type: String },
});

export const interviewModel = mongoose.model<IInterviewDocument>(
  'Interview',
  InterviewSchema
);
