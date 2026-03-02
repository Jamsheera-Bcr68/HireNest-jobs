import { IProfileEditUsecase } from '../../interfaces/candidate/IProfileEditUsecase';
import { CandidateProfileUpdateDto } from '../../Dtos/candidateDto';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';

import { AppError } from '../../../domain/errors/AppError';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { User } from '../../../domain/entities/User';
import {
  IAddress,
  ISocialMediaLinks,
} from '../../../domain/values/profileTypes';

export class CandidateProfileEditUsecase implements IProfileEditUsecase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }
  async execute(data: CandidateProfileUpdateDto): Promise<User> {
    console.log('from usecase data is', data);
    const user = await this._userRepository.findOne({
      id: data.userId,
      email: data.email,
      role: data.role,
    });
    console.log('user from usercase ', user);
    if (!user || !user.id) {
      throw new AppError(
        authMessages.error.USER_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }
    const links: ISocialMediaLinks = {
      gitHub: data.socialMedidaLinks?.gitHub ?? user.socialMediaLinks?.gitHub,
      whatsapp:
        data.socialMedidaLinks?.whatsapp ?? user.socialMediaLinks?.whatsapp,
      linkedIn:
        data.socialMedidaLinks?.linkedIn ?? user.socialMediaLinks?.linkedIn,
      portfolio:
        data.socialMedidaLinks?.portfolio ?? user.socialMediaLinks?.portfolio,
      youtube:
        data.socialMedidaLinks?.youtube ?? user.socialMediaLinks?.youtube,
      twitter:
        data.socialMedidaLinks?.twitter ?? user.socialMediaLinks?.twitter,
    };
    const address: IAddress = {
      place: data.location?.place ?? user.address?.place,
      state: data.location?.state ?? user.address?.state,
      country: data.location?.country ?? user.address?.country,
    };
    user.name = data.name ?? user.name;
    user.address = address;
    user.title = data.title ?? user.title;
    user.socialMediaLinks = links;
    console.log('user before saving ', user);

    const updated = await this._userRepository.addProfileData(user?.id, user);
    if (!updated) {
      throw new AppError(
        authMessages.error.USERID_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }
    return updated;
  }
}
