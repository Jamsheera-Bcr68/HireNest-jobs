import { IAdminGetEntitiesUseCase } from '../../interfaces/admin/get-admin-entities.usecase';
import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { UserRole } from '../../../domain/enums/user.enums';
import {
  CandidateFilterType,
  PaginatedCandidates,
  PaginatedEntities,
} from '../../types/candidate.type';
import { IEducationRepository } from '../../../domain/repository-iInterfaces/education-repository.interface';
import { EducationLevel } from '../../../domain/enums/education.enum';
import { AppError } from '../../../domain/errors/app-error';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

export class AdminGetCandidateUseCase implements IAdminGetEntitiesUseCase<User> {
  constructor(
    private userRepository: IUserRepository,
    private eduRepository: IEducationRepository
  ) {}
  async execute(filter: CandidateFilterType): Promise<PaginatedEntities<User>> {
    const { page, limit, status, search, education, ...rest } = filter;

    let query = rest as Partial<User>;
    if (status === 'active') {
      query = { ...query, isBlocked: false };
    } else if (status === 'suspended') {
      query.isBlocked = true;
    }

    const candidates = await this.userRepository.getCandidateList(
      { ...query, role: UserRole.CANDIDATE },
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,

      search || '',
      education || ''
    );

    return candidates;
  }
}
