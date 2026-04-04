import { type ISocialLinks, type AddressType } from '../../profileTypes';
import { type SkillType } from './skillTypes';
import { type ExperienceType } from './experienceType';
import type { EducationType } from './educationTypes';
import type { ResumeType } from './ResumeType';

export type StatusType =
  | 'active'
  | 'suspended'
  | 'pending'
  | 'rejected'
  | 'paused'
  | 'expired'
  | 'closed'
  | 'removed';

export type userDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  title: string;
  address: AddressType;
  socialLinks: ISocialLinks;
  savedJobs: string[];
  companyId?: string;
};

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  title?: string;
  skills: Array<SkillType>;
  address?: AddressType;
  socialLinks?: ISocialLinks;
  imageUrl?: string;
  about?: string;
  experience: ExperienceType[] | [];
  education: EducationType[] | [];
  resumes: ResumeType[] | [];
  isBlocked: boolean;
  createdAt: string;
}

export interface CompanyProfileType {
  id: string;
  email: string;
  phone: string;
  isVerified: boolean;
  companyName: string;
  logoUrl: string;
  tagline: string;
  website?: string;
  industry: string;
  size: string;
  startedIn: string;
  address: {
    country: string;
    state: string;
  };
  mission: string;
  vision: string;
  jobCount?: string;
  culture: string;
  status: StatusType;
  benefits: string[] | [];
  about: string;
  createdAt: string;
  joinedAt?: string;
  socialMediaLinks: ISocialLinks;
  document: { type: string; file: string };
}
export type CompanyFieldUpdateType = {
  about?: string;
  mission?: string;
  vision?: string;
  culture?: string;
  benefits?: string[] | [];
};
