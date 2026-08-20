import { UserRole } from '../enums/user.enums';
import {
  IAddress,
  IExperience,
  IResume,
  ISocialMediaLinks,
} from '../values/profile-types';
import { UserSkillDto } from '../../applications/dtos/skill.dto';

import { Experience } from './experience.entity';
import { EducationDto } from '../../applications/dtos/education.dto';
import { CompanyRequestType } from '../values/profile-types';

export class User {
  public readonly id?: string;
  public email: string;
  public password: string;
  public phone: string;
  public createdAt: Date;
  public isRequested: boolean;
  public companyRequests: CompanyRequestType[] | [];
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
  public savedJobs: string[];

  constructor(
    email: string,
    password: string,
    phone: string,
    createdAt: Date,
    updatedAt: Date,
    isVerified: boolean,
    isRequested: boolean,
    companyRequests: CompanyRequestType[] | [],
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
    isBlocked?: boolean,
    about?: string,
    skills?: UserSkillDto[] | [],
    savedJobs?: string[]
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isVerified = isVerified;
    this.isRequested = isRequested || false;
    this.companyRequests = companyRequests || [];
    this.experience = experience ?? [];
    this.resumes = resumes || [];
    this.resetToken = resetToken;
    this.resetTokenExpiry = resetTokenExpiry;
    this.googleId = googleId;
    this.role = role;
    this.name = name;
    this.title = title;
    this.address = address;
    this.socialMediaLinks = socialMediaLinks;
    this.imageUrl = imageUrl;
    this.isBlocked = isBlocked;
    this.about = about;
    this.skills = skills;
    this.savedJobs = savedJobs ?? [];
    this.education = education ?? [];
  }
}
