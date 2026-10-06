import { IAdminGetEntitiesUseCase } from '../../interfaces/admin/get-admin-entities.usecase';
import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { UserRole } from '../../../domain/enums/user.enums';
import {
  CandidateFilterType,
  PaginatedEntities,
} from '../../types/candidate.type';
import { IEducationRepository } from '../../../domain/repository-interfaces/education-repository.interface';
import { IFileResolverService } from '../../services/file-url-resolver.service';

export class AdminGetCandidateUseCase implements IAdminGetEntitiesUseCase<User> {
  constructor(
    private _userRepository: IUserRepository,
    private _eduRepository: IEducationRepository,
    private _fileUrlResolverService: IFileResolverService
  ) {}
  async execute(filter: CandidateFilterType): Promise<PaginatedEntities<User>> {
    const { page, limit, status, search, education, ...rest } = filter;

    let query = rest as Partial<User>;
    if (status === 'active') {
      query = { ...query, isBlocked: false };
    } else if (status === 'suspended') {
      query.isBlocked = true;
    }

    const { entities, totalDocs } = await this._userRepository.getCandidateList(
      { ...query, role: UserRole.CANDIDATE },
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,

      search || '',
      education || ''
    );

    const fileResolver = this._fileUrlResolverService.createResolver();

    const updated: User[] = await Promise.all(
      entities.map(async (cand) => {
        return {
          ...cand,
          imageUrl: (await fileResolver(cand.imageUrl)) ?? '',
          resumes: await Promise.all(
            cand.resumes.map(async (res) => ({
              ...res,
              url: (await fileResolver(res.url)) ?? '',
            }))
          ),
        };
      })
    );
    return { entities: updated, totalDocs };
  }
}
