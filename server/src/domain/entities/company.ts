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
  phone?: string;
  about: string;
  startedIn: number;
  isAgreed: boolean;
  isConsent: boolean;
  logoUrl: string;
  industry: IndustryType;
  socialMediaLinks: ISocialMediaLinks;
  size: CompanySize;
  address: IAddress;
  document: VerificationDocType;
}
