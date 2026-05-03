import {
  type IndustryType,
  type CompanySize,
} from './profileTypes/industryType';
import { type ISocialLinks } from '../profileTypes';
export type CompanyDataDto = {
  companyName: string;
  logoUrl?: string;
  tagLine?: string;

  website?: string;

  about: string;
  mission: string;
  vision: string;
  culture: string;

  benefits: string[];

  startedIn: number;

  industry: IndustryType;
  size: CompanySize;

  address: string;

  socialMediaLinks: ISocialLinks;
};
