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
  mission: string;
  vision: string;
  culture: string;
  benefits: string[] | [];
  startedIn: number;
  isAgreed: boolean;
  isConsent: boolean;
  logoUrl?: string;
  industry: IndustryType;
  socialMediaLinks: ISocialMediaLinks;
  size: CompanySize;
  address: IAddress;
  document: VerificationDocType;
}
export interface CompanyUpdateDto {
  companyName: string;
  website?: string;
  tagLine?: string;

  startedIn: number;
  industry: IndustryType;
  socialMediaLinks: ISocialMediaLinks;
  size: CompanySize;
  address: IAddress;
}
export type RegisterFormType = {
  document: {
    type: DocumentType | '';
    file: File | string;
  };
};
export  interface CompanyListDTO {
  id: string;
  companyName: string;
  email: string;
  logoUrl?: string;
  status: string;
  industry?: string;
  jobCount: number;
  createdAt: Date;
}

export type PaginatedCompanies = {
  companies: CompanyListDTO[];
  totalDocs: number;
};

export type CompanyStatus={
  totalCompany?:number
  active?:number
  pending?:number
  suspended?:number
  rejected?:number
}
