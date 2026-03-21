import { IAdminGetEntitiesUseCase } from '../../interfaces/admin/IAdminGetEntitiesUseCase';
import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { UserRole } from '../../../domain/enums/userEnums';
import {
  CandidateFilterType,
  PaginatedCandidates,
  PaginatedEntities,
} from '../../types/candidateType';
import { IEducationRepository } from '../../../domain/repositoriesInterfaces/IEducationRepository';
import { EducationLevel } from '../../../domain/enums/EducationEnum';
import { AppError } from '../../../domain/errors/AppError';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

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
