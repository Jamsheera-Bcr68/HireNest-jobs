import mongoose, { Schema, Types, model } from 'mongoose';
import { StatusEnum } from '../../../../domain/enums/statusEnum';

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

export interface ICompanyDocument {
  _id: mongoose.Types.ObjectId;
  companyName: string;
  userId: Types.ObjectId;
  website: string;
  
  status: StatusEnum;
  tagLine: string;
  email: string;
  phone: string;
  about: string;
  mission: string;
  vision: string;
  culture: string;
  benefits: string[] | [];
  startedIn: number;
  isAgreed: boolean;
  isConsent: boolean;
  logoUrl: string;
  requestedSkills:Types.ObjectId[] | [],
  industry: IndustryType;
  socialMediaLinks: ISocialMediaLinks;
  size: CompanySize;
  address: IAddress;
  isVerified: boolean;
  document: VerificationDocType;
  createdAt:Date
}

const companySchema = new Schema<ICompanyDocument>(
  {
    companyName: { type: String, required: true },
    website: { type: String },
    tagLine: String,
    email: String,
    phone: String,
    about: String,
    mission: String,
    vision: String,
    culture: String,
    benefits: { type: [String], default: [] },
    userId: Types.ObjectId,
    startedIn: Number,
    isAgreed: Boolean,
    isConsent: Boolean,
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.PENDING,
    },
    isVerified: { type: Boolean, default: false },
    logoUrl: String,
   
    requestedSkills: { type: [Schema.Types.ObjectId], ref: 'Skill', default: [] },

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
      type: {
        type: String,
        enum: Object.values(Document_Types),
      },
      file: String,
    },
  },
  { timestamps: true }
);

export const companyModel = model<ICompanyDocument>('Company', companySchema);
