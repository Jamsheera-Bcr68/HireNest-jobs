import { WorkMode } from '../enums/WorkMode';

export interface IAddress {
  place?: string;
  state?: string;
  country?: string;
}

export interface ISocialMediaLinks {
  linkedIn?: string;
  whatsapp?: string;
  youtube?: string;
  gitHub?: string;
  twitter?: string;
  portfolio?: string;
}

export interface IExperience {
  userId?: string;
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  role?: string;
  location?: string;
  description?: string;
  isWorking: boolean;
  mode: WorkMode;
  id?: string;
}
export interface IResume {
  id?: string;
  url: string;
  name: string;
  isDefault: boolean;
  uploadedAt: Date;
}
