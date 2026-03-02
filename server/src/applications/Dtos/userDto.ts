import { UserRole } from '../../domain/enums/userEnums';
import { IAddress, ISocialMediaLinks } from '../../domain/values/profileTypes';

export interface userDto {
  id: string;
  email: string;
  imageUrl?: string;
  role: UserRole;
  phone: string;
  isBlocked: boolean;
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
}
