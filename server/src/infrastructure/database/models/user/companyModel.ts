import mongoose, { Schema, Types, model } from 'mongoose';

import {
  type IndustryType,
  CompanySize,
  VerificationDocType,
  Industry_Type,
  Company_Size,
  Document_Types,
} from '../../../../domain/types/companyProfileTypes';
import {
  ISocialMediaLinks,
  IAddress,
} from '../../../../domain/values/profileTypes';
import { IUserDocument } from './userModel';

export interface ICompanyDocument {
  _id: mongoose.Types.ObjectId;
  companyName: string;
  userId: Types.ObjectId;
  website: string;
  tagLine: string;
  email: string;
  phone: string;
  about: string;
  startedIn: number;
  isAgreed: boolean;
  isConsent: boolean;
  logoUrl: string;
  industry: IndustryType;
  socialMediaLinks: ISocialMediaLinks;
  size: CompanySize;
  address: IAddress;
  isVerified: boolean;
  document: VerificationDocType;
}

const companySchema = new Schema<ICompanyDocument>({
  companyName: { type: String, required: true },
  website: { type: String },
  tagLine: String,
  email: String,
  phone: String,
  about: String,
  userId: Types.ObjectId,
  startedIn: Number,
  isAgreed: Boolean,
  isConsent: Boolean,
  isVerified: { type: Boolean, default: false },
  logoUrl: String,
  industry: { type: String, enum: Industry_Type },
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
  size: { type: String, enum: Company_Size },
  address: {
    type: { place: String, state: String, country: String },
  },
  document: {
    type: String,
    enum: Document_Types,
    file: String,
  },
});

export const companyModel = model<ICompanyDocument>('Company', companySchema);
