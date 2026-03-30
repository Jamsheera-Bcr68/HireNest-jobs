import { email } from 'zod';
import { User } from '../../domain/entities/User';

export class UserMapper {
  static toDto(user: User) {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isRequested: user.isRequested,
      imageUrl: user.imageUrl,
      isblocked: user.isBlocked,
      savedJobs: user.savedJobs,
    };
  }
  static toUserProfileDto(user: User) {
    console.log('user befor converting user.isBlocked', user.isBlocked);

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      skills: user.skills,
      name: user.name,
      experience: user.experience,
      imageUrl: user.imageUrl,
      title: user.title,
      education: user.education,
      address: user.address,
      socialLinks: user.socialMediaLinks,
      about: user.about,
      resumes: user.resumes,
      createdAt: user.createdAt,
      isBlocked: user.isBlocked,
    };
  }
}
