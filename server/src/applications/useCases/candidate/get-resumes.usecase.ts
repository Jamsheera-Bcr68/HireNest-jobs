import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { IResume } from '../../../domain/values/profile-types';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

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
