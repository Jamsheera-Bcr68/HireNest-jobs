import {
  CompanySize,
  IndustryType,
} from '../../domain/types/companyProfileTypes';
import { ISocialMediaLinks, IAddress } from '../../domain/values/profileTypes';
import { VerificationDocType } from '../../domain/types/companyProfileTypes';

export interface companyDto {
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
  logo?: string;
  industry: IndustryType;
  socialMediaLinks: ISocialMediaLinks;
  size: CompanySize;
  address: IAddress;
  documents: VerificationDocType;
}
export type RegisterFormType = {
  documents: {
    type: DocumentType | '';
    file: File | string;
  };
};
