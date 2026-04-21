import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { IResume } from '../../../domain/values/profileTypes';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export interface IGetCandidateResumesUsecase {
  execute(id: string): Promise<IResume[]>;
}

export class GetCandidateResumesUsecase implements IGetCandidateResumesUsecase {
  constructor(private _userRepository: IUserRepository) {}
  async execute(id: string): Promise<IResume[]> {
    const candidate = await this._userRepository.findById(id);
    if (!candidate)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );
    return candidate.resumes;
  }
}
