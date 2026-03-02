import { Types, Schema, Model, model, Document } from 'mongoose';
import { UserRole } from '../../../../domain/enums/userEnums';

export interface IAdminDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  resetToken: string;
  role: UserRole;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdminDocument>(
  {
    _id: { type: Types.ObjectId, required: true },
    email: { type: String },
    password: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.ADMIN,
    },
    resetToken: { type: String },
    googleId: { type: String },
  },

  { timestamps: true }
);

export const adminModel: Model<IAdminDocument> = model<IAdminDocument>(
  'Admin',
  adminSchema
);
