import { StatusEnum } from '../enums/statusEnum';
import {
  CompanySize,
  IndustryType,
  VerificationDocType,
} from '../types/companyProfileTypes';
import { IAddress, ISocialMediaLinks } from '../values/profileTypes';

export interface Company {
  id?: string;
  userId: string;
  companyName: string;
  website?: string;
  tagLine?: string;
  email?: string;
  status: StatusEnum;

  requestedSkills: string[] | [];
  joinedAt: Date;
  phone?: string;
  about: string;
  mission: string;
  vision: string;
  culture: string;
  benefits: string[] | [];
  startedIn: number;
  isVerified: boolean;
  isAgreed: boolean;
  isConsent: boolean;
  logoUrl: string;
  industry: IndustryType;
  socialMediaLinks: ISocialMediaLinks;
  size: CompanySize;
  address: IAddress;
  document: VerificationDocType;
}
