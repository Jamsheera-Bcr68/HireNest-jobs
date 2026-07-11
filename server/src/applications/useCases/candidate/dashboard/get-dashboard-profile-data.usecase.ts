import { User } from '../../../../domain/entities/user.entity';
import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../../domain/repository-interfaces/company-repository.interface';
import { IUserRepository } from '../../../../domain/repository-interfaces/user-repository.interface';
import { UserRepository } from '../../../../infrastructure/repositories/user.repository';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { DashboardProfileData } from '../../../types/candidate-dashboard.types';

export interface IDashboardProfileDataUsecase {
  execute(userId: string, role: UserRole): Promise<DashboardProfileData>;
}

export class DashboardProfileDataUsecase implements IDashboardProfileDataUsecase {
  constructor(
    private _userRepository: IUserRepository,
    private companyRepository: ICompanyRepository
  ) {}
  private getProfileCompletionPercentage(candidate: User): {
    percentage: number;
    remaining: number;
    remainingFields: string[];
  } {
    const fields = [
      { name: 'Profile Image', completed: !!candidate.imageUrl },
      { name: 'Name', completed: !!candidate.name },
      { name: 'Email', completed: !!candidate.email },
      { name: 'Phone', completed: !!candidate.phone },
      { name: 'Title', completed: !!candidate.title },
      { name: 'About', completed: !!candidate.about },
      { name: 'Resume', completed: candidate.resumes.length > 0 },
      { name: 'Skills', completed: (candidate.skills?.length ?? 0) > 0 },
      { name: 'Experience', completed: candidate.experience.length > 0 },
      { name: 'Education', completed: candidate.education.length > 0 },
      { name: 'Country', completed: !!candidate.address?.country },
    ];
    const remainingFields = fields
      .filter((field) => !field.completed)
      .map((field) => field.name);
    const completed = Object.values(fields).filter(Boolean).length;
    const total = Object.keys(fields).length;

    const profileCompletion = Math.round((completed / total) * 100);
    return {
      percentage: profileCompletion,
      remaining: total - completed,
      remainingFields,
    };
  }
  async execute(userId: string, role: UserRole): Promise<DashboardProfileData> {
    if (role === UserRole.CANDIDATE) {
      const candidate = await this._userRepository.findById(userId);
      if (!candidate)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Candidate'),
          statusCodes.NOTFOUND
        );

      const { percentage, remainingFields } =
        this.getProfileCompletionPercentage(candidate);
      return {
        completion: percentage,
        missingFields: remainingFields,
      };
      // } else if (role == UserRole.COMPANY) {
      //   const company = await this.companyRepository.findByUserId(userId);
      //   if (!company)

      //       throw new AppError(
      //         generalMessages.errors.NOT_FOUND('Company'),
      //         statusCodes.NOTFOUND
      //       );
    } else
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );
  }
}
