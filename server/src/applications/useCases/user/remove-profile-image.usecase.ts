import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IRemoveProfileImageUseCase } from '../../interfaces/user/remove-image.usecase';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';

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
