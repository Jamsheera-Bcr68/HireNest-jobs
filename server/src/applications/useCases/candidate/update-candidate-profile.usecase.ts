import { IProfileEditUsecase } from '../../interfaces/candidate/update-profile.usecase';
import { CandidateProfileUpdateDto } from '../../dtos/candidate.dto';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';

import { AppError } from '../../../domain/errors/app-error';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { User } from '../../../domain/entities/user.entity';
import {
  IAddress,
  ISocialMediaLinks,
} from '../../../domain/values/profile-types';
import { IFileResolverService } from '../../services/file-url-resolver.service';

export class CandidateProfileEditUsecase implements IProfileEditUsecase {
  private _userRepository: IUserRepository;
  constructor(
    userRepository: IUserRepository,
    private _fileUrlResolverService: IFileResolverService
  ) {
    this._userRepository = userRepository;
  }
  async execute(data: CandidateProfileUpdateDto): Promise<User> {
    const user = await this._userRepository.findOne({
      id: data.userId,
      email: data.email,
      role: data.role,
    });

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

    const updated = await this._userRepository.addProfileData(user?.id, user);
    if (!updated) {
      throw new AppError(
        authMessages.error.USERID_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    }

    const fileUrlResolver = this._fileUrlResolverService.createResolver();
    return {
      ...updated,
      imageUrl: await fileUrlResolver(updated.imageUrl),
      resumes: await Promise.all(
        updated.resumes.map(async (res) => ({
          ...res,
          url: (await fileUrlResolver(res.url)) ?? '',
        }))
      ),
    };
  }
}
