import {
  CompanySize,
  IndustryType,
} from '../../domain/types/company-profile.types';
import { ISocialMediaLinks, IAddress } from '../../domain/values/profile-types';
import { VerificationDocType } from '../../domain/types/company-profile.types';
import { StatusEnum } from '../../domain/enums/status.enum';

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
    name: string;
  };
};
export interface CompanyListDTO {
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

export type CompanyStatus = {
  totalCompany?: number;
  active?: number;
  pending?: number;
  suspended?: number;
  rejected?: number;
};
export type CompanyDataDto = {
  companyName: string;
  logoUrl?: string;
  tagLine?: string;
  hiredCount?: number;
  totalJobs?: number;
  totalInterviews?:number
  totalApps?:number
  website?: string;
 document: VerificationDocType;
  about: string;
  mission: string;
  vision: string;
  culture: string;

  benefits: string[];

  startedIn: number;

  industry: IndustryType;
  size: CompanySize;

  address: IAddress;

  socialMediaLinks: ISocialMediaLinks;
};

export type CompanyFilterDto = {
  startDate?: Date;
  endDate?: Date;

  status?: StatusEnum;
  industry?: IndustryType;
};

export type PendingCompany = {
  id: string;
  email?: string;
  logoUrl: string;
  location: string;
  submittedAt: string;
};
