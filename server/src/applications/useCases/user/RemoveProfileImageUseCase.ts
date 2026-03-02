import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IRemoveProfileImageUseCase } from '../../interfaces/user/IRemoveProfileImage';
import { IFileStorageService } from '../../interfaces/services/IFileStorageServices';

export class RemoveProfileImageUseCase implements IRemoveProfileImageUseCase {
  private _userRepository: IUserRepository;
  private _imageStorageService: IFileStorageService;
  constructor(
    userRepository: IUserRepository,
    imageStorageService: IFileStorageService
  ) {
    this._userRepository = userRepository;
    this._imageStorageService = imageStorageService;
  }
  async execute(userId: string, role: UserRole): Promise<User> {
    const user = await this._userRepository.findById(userId);
    if (!user || !user.role || !user.id)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    if (!user.imageUrl)
      throw new AppError(
        userMessages.error.IMAGE_ALREADY_REMOVED,
        statusCodes.CONFLICT
      );
    const fileName = user.imageUrl;

    user.imageUrl = '';
    const updatad = await this._userRepository.removeProfileImage(user.id);
    if (!updatad)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    await this._imageStorageService.removeFile(fileName);
    return updatad;
  }
}
