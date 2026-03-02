import { type ISocialLinks, type AddressType } from '../profileTypes';
import { type SkillType } from './skillTypes';
export type userDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  title: string;
  address: AddressType;
  socialLinks: ISocialLinks;
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
}
