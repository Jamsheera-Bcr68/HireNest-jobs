import { Types, Schema, model, Model, Document } from 'mongoose';
import { UserRole } from '../../../../domain/enums/userEnums';
import { WorkMode } from '../../../../domain/enums/WorkMode';
import {
  IAddress,
  ISocialMediaLinks,
  IResume,
} from '../../../../domain/values/profileTypes';
import { ISkillDocument } from './skillModel';

interface ResumeDocument {
  _id: Types.ObjectId;
  url: string;
  name: string;
  isDefault: boolean;
  uploadedAt: Date;
}

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  password: string;
  role?: UserRole;
  email: string;
  phone: string;
  googleId?: string;
  isVerified: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  name?: string;
  title?: string;
  address?: IAddress;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  isBlocked: boolean;
  socialMediaLinks: ISocialMediaLinks;
  about: string;
  skills: Types.ObjectId[] | ISkillDocument[];
  experience: Types.ObjectId[] | [];
  education: Types.ObjectId[] | [];
  resumes: ResumeDocument[] | [];
}

const userSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
    default: UserRole.CANDIDATE,
  },
  imageUrl: { type: String },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  name: { type: String },
  title: { type: String },
  address: {
    type: { place: String, state: String, country: String },
  },
  isVerified: { type: Boolean, required: true, default: false },
  isBlocked: { type: Boolean, default: false },
  googleId: { type: String },
  socialMediaLinks: {
    type: {
      linkedIn: String,
      whatsapp: String,
      youtube: String,
      gitHub: String,
      twitter: String,
      portfolio: String,
    },
  },
  about: { type: String },
  skills: { type: [Schema.Types.ObjectId], ref: 'Skill', default: [] },
  experience: { type: [Schema.Types.ObjectId], ref: 'Experience', default: [] },
  education: { type: [Schema.Types.ObjectId], ref: 'Education', default: [] },
  resumes: {
    type: [{ url: String, isDefault: Boolean, name: String, uploadedAt: Date }],
    default: [],
  },
});
export const userModel: Model<IUserDocument> = model<IUserDocument>(
  'User',
  userSchema
);
