import { Education } from '../../domain/entities/education.entity';
import { Experience } from '../../domain/entities/experience.entity';
import { StatusEnum } from '../../domain/enums/status.enum';
import { UserRole } from '../../domain/enums/user.enums';
import { IAddress, IResume, ISocialMediaLinks } from '../../domain/values/profile-types';
import { EducationDto } from './education.dto';

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
  isRequested: boolean;
  company: { status: StatusEnum;id:string, reason?: string }|null;
  socialLinks?: ISocialMediaLinks;
  createdAt: string;
  isBlocked: boolean;
  experience: Array<Experience>;
  education:Array<EducationDto>
  about:string
  resumes:Array<IResume>
}
