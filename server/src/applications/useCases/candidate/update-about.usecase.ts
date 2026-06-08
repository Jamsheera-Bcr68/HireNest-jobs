import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IEditAboutUseCase } from '../../interfaces/candidate/update-about.usecase';

export class EditAboutUseCase implements IEditAboutUseCase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }
  async execute(userId: string, role: UserRole, about: string): Promise<User> {
    const user = await this._userRepository.findById(userId);
    if (!user || !user.id || user.role !== role)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    user.about = about;
    const updated = await this._userRepository.addProfileData(user.id, user);
    if (!updated)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    return updated;
  }
}
