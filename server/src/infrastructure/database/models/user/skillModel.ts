import mongoose, { model, Model, Types } from 'mongoose';
import { UserRole } from '../../../../domain/enums/userEnums';
import { SkillStatus } from '../../../../domain/enums/skillEnum';

export interface ISkillDocument extends Document {
  _id: Types.ObjectId;
  skillName: string;
  createdBy: UserRole;
  createdAt: Date;
  status: SkillStatus;
  userId?: Types.ObjectId;
}

const skillSchema = new mongoose.Schema<ISkillDocument>({
  skillName: String,
  createdBy: { type: String, enum: Object.values(UserRole) },
  createdAt: { type: Date, default: new Date() },
  userId: { type: Types.ObjectId },

  status: {
    type: String,
    enum: Object.values(SkillStatus),
    default: SkillStatus.PENDING,
  },
});

export const skillModel: Model<ISkillDocument> = model<ISkillDocument>(
  'Skill',
  skillSchema
);
