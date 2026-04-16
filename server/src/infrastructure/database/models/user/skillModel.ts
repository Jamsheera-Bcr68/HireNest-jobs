import mongoose, { model, Model, Types } from 'mongoose';
import { UserRole } from '../../../../domain/enums/userEnums';
import { SkillStatus } from '../../../../domain/enums/skillEnum';
import { number } from 'zod';

export interface ISkillDocument extends Document {
  _id: Types.ObjectId;
  skillName: string;
  createdBy: UserRole;
  createdAt: Date;
  reviewedAt: Date;
  status: SkillStatus;
  userId?: Types.ObjectId;
  postUsedCount: number;
  candidateUsedCount: number;
  reasonForRemove?: string;
  reasonForReject?: string;
}

const skillSchema = new mongoose.Schema<ISkillDocument>({
  skillName: String,
  createdBy: { type: String, enum: Object.values(UserRole) },
  createdAt: { type: Date, default: new Date() },
  reviewedAt: { type: Date },
  userId: { type: Types.ObjectId },

  status: {
    type: String,
    enum: Object.values(SkillStatus),
    default: SkillStatus.PENDING,
  },
  reasonForReject: { type: String, default: null },
  reasonForRemove: { type: String, default: null },
  postUsedCount: { type: Number, default: 0 },
  candidateUsedCount: { type: Number, default: 0 },
});

export const skillModel: Model<ISkillDocument> = model<ISkillDocument>(
  'Skill',
  skillSchema
);
