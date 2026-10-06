import { User } from '../../../domain/entities/user.entity';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { adminMessages } from '../../../shared/constants/messages/admin.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IFileResolverService } from '../../services/file-url-resolver.service';

export interface IAdminUpdateCandidateUseCase {
  execute(id: string, data: Partial<User>): Promise<User>;
}

export class AdminUpdateCandidateUseCase implements IAdminUpdateCandidateUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _fileUrlResolverService: IFileResolverService
  ) {}
  async execute(id: string, data: Partial<User>): Promise<User> {
    const candidate = await this._userRepository.findById(id);
    if (!candidate) {
      throw new AppError(
        adminMessages.error.CANDIDATE_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }
    const updated = await this._userRepository.save(id, {
      ...candidate,
      ...data,
    });
    if (!updated) {
      throw new AppError(
        adminMessages.error.CANDIDATE_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }
    const fileResolver = this._fileUrlResolverService.createResolver();
    const updatedCandidate = {
      ...candidate,
      imageUrl: await fileResolver(candidate.imageUrl),
      resumes: await Promise.all(
        candidate.resumes.map(async (res) => ({
          ...res,
          url: await fileResolver(res.url)??'',
        }))
      ),
    };
    return updatedCandidate;
  }
}
