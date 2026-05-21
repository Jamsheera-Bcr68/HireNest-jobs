import { Experience } from '../../domain/entities/experience.entity';
import { UserRole } from '../../domain/enums/user.enums';
import { IAddress, ISocialMediaLinks } from '../../domain/values/profile-types';

export interface userDto {
  id: string;
  email: string;
  imageUrl?: string;
  isRequested: boolean;
  role: UserRole;
  phone: string;
  isBlocked: boolean;
  appliedJobs?: string[];
}
export interface userProfileDto {
  id: string;
  name: string;
  email: string;
  phone?: string;
  imageUrl?: string;
  title?: string;
  skills: Array<string>;
  address?: IAddress;
  socialLinks?: ISocialMediaLinks;
  createdAt: string;
  isBlocked: boolean;
  experience: Array<Experience>;
}
