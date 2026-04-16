import mongoose from 'mongoose';
import { ApplicationStatusEnum } from '../../../domain/enums/statusEnum';

export interface IApplicationDocument {
  _id: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  appliedAt: Date;
  status: ApplicationStatusEnum;
  rejectedReason?: string;
}

export const applicationSchema = new mongoose.Schema<IApplicationDocument>({
  candidateId: { type: mongoose.Types.ObjectId, ref: 'User' },
  companyId: { type: mongoose.Types.ObjectId, ref: 'User' },
  jobId: { type: mongoose.Types.ObjectId, ref: 'User' },
  rejectedReason: { type: String, default: '' },
  status: {
    type: String,
    enum: Object.values(ApplicationStatusEnum),
    default: ApplicationStatusEnum.PENDING,
  },
  appliedAt: { type: Date, default: new Date() },
});

export const applicationModel = mongoose.model<IApplicationDocument>(
  'Application',
  applicationSchema
);
