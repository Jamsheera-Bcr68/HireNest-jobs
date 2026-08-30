import { email } from 'zod';
import { User } from '../../domain/entities/user.entity';
import { Company } from '../../domain/entities/company.entity';
import { StatusEnum } from '../../domain/enums/status.enum';
import { AdminCandidateDto, userProfileDto } from '../dtos/user.dto';

export class UserMapper {
  static toDto(user: User, name?: string) {
    let returnData = {
      id: user.id,
      email: user.email,
      name: name,
      phone: user.phone,
      role: user.role,
      isRequested: user.isRequested,
      imageUrl: user.imageUrl,
      isblocked: user.isBlocked,
      savedJobs: user.savedJobs,
    };

    return returnData;
  }
  static toUserProfileDto(user: User, company: Company | null): userProfileDto {
    //  console.log('user befor converting user.isBlocked', user.isBlocked);
    let companyData: {
      status: StatusEnum;
      id: string;
      reason?: string;
    } | null = null;
    if (company && company.id) {
      companyData = {
        status: company.status,
        id: company.id,
        reason: company.reasonForReject,
      };
    }
    return {
      id: user.id ?? '',
      email: user.email,
      phone: user.phone,
      skills:
        user.skills?.map((s) => ({ id: s.id, skillName: s.skillName })) ?? [],
      name: user.name ?? '',
      experience: user.experience,
      imageUrl: user.imageUrl,
      title: user.title,
      education: user.education,
      address: user.address,
      socialLinks: user.socialMediaLinks,
      isRequested: user.isRequested,
      company: companyData,
      about: user.about ?? '',
      resumes: user.resumes,
      createdAt: user.createdAt ? new Date(user.createdAt).toDateString() : '',
      isBlocked: user.isBlocked ?? false,
    };
  }
  static toAdminCandidateDto(
    user: User,
    company: Company | null,
    totalAppcount: number,
    interviewCount: number,
    shortListedCount: number,
    offeredCount: number
  ): AdminCandidateDto {
    //  console.log('user befor converting user.isBlocked', user.isBlocked);
    let companyData: {
      status: StatusEnum;
      id: string;
      reason?: string;
    } | null = null;
    if (company && company.id) {
      companyData = {
        status: company.status,
        id: company.id,
        reason: company.reasonForReject,
      };
    }
    return {
      id: user.id ?? '',
      email: user.email,
      phone: user.phone,
      skills:
        user.skills?.map((s) => ({ id: s.id, skillName: s.skillName })) ?? [],
      name: user.name ?? '',
      experience: user.experience,
      imageUrl: user.imageUrl,
      title: user.title,
      education: user.education,
      address: user.address,
      socialLinks: user.socialMediaLinks,
      isRequested: user.isRequested,
      company: companyData,
      about: user.about ?? '',
      resumes: user.resumes,
      createdAt: user.createdAt ? new Date(user.createdAt).toDateString() : '',
      isBlocked: user.isBlocked ?? false,
      applicationCount: totalAppcount ?? 0,
      interviewsCount: interviewCount ?? 0,
      shortListedCount: shortListedCount ?? 0,
      offeredCount: offeredCount ?? 0,
    };
  }
}
