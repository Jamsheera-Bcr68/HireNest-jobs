import { UserRole } from '../enums/userEnums';
import {
  IAddress,
  IExperience,
  IResume,
  ISocialMediaLinks,
} from '../values/profileTypes';
import { UserSkillDto } from '../../applications/Dtos/skillDto';

import { Experience } from './Experience';
import { EducationDto } from '../../applications/Dtos/educationDto';

export class User {
  public readonly id?: string;
  public email: string;
  public password: string;
  public phone: string;
  public createdAt: Date;
  public updatedAt: Date;
  public resetToken?: string;
  public resetTokenExpiry?: Date;
  public isVerified: boolean;
  public googleId?: string;
  public role?: UserRole;
  public imageUrl?: string;
  public isBlocked?: boolean;
  public name?: string;
  public title?: string;
  public address?: IAddress;
  public socialMediaLinks?: ISocialMediaLinks;
  public about?: string;
  public skills?: UserSkillDto[];
  public experience: Experience[];
  public education: EducationDto[];
  public resumes: IResume[] | [];

  constructor(
    email: string,
    password: string,
    phone: string,
    isVerified: boolean,
    experience?: Experience[] | [],
    education?: EducationDto[] | [],
    resumes?: IResume[],
    id?: string | undefined,
    resetToken?: string,
    resetTokenExpiry?: Date | undefined,
    googleId?: string,
    role?: UserRole | undefined,
    name?: string,
    title?: string,
    address?: IAddress,
    socialMediaLinks?: ISocialMediaLinks,
    imageUrl?: string | undefined,
    about?: string,
    skills?: UserSkillDto[] | [],

    createdAt = new Date(),
    updatedAt = new Date()
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isVerified = isVerified;
    ((this.experience = experience ?? []),
      (this.resumes = resumes || []),
      (this.resetToken = resetToken));
    this.resetTokenExpiry = resetTokenExpiry;
    this.googleId = googleId;
    this.role = role;
    this.name = name;
    this.title = title;
    this.address = address;
    this.socialMediaLinks = socialMediaLinks;
    this.imageUrl = imageUrl;
    this.about = about;
    this.skills = skills;
    this.education = education ?? [];
  }
}
