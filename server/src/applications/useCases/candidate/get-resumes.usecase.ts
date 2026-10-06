import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { IResume } from '../../../domain/values/profile-types';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IFileResolverService } from '../../services/file-url-resolver.service';

export interface IGetCandidateResumesUsecase {
  execute(id: string): Promise<IResume[]>;
}

export class GetCandidateResumesUsecase implements IGetCandidateResumesUsecase {
  constructor(
    private _userRepository: IUserRepository,
    private _fileUrlResolverService: IFileResolverService
  ) {}
  async execute(id: string): Promise<IResume[]> {
    const fileUrlResolver = this._fileUrlResolverService.createResolver();
    const candidate = await this._userRepository.findById(id);
    if (!candidate)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );
    return await Promise.all(
      candidate.resumes.map(async (res) => ({
        ...res,
        url: (await fileUrlResolver(res.url)) ?? '',
      }))
    );
  }
}
