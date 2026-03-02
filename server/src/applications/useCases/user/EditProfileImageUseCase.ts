import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { UploadFileDto } from '../../Dtos/uploadFileDto';
import { IEditProfileImageUsecase } from '../../interfaces/user/IEditProfileImageUsecase';
import { IFileStorageService } from '../../interfaces/services/IFileStorageServices';

export class EditProfileImageUseCase implements IEditProfileImageUsecase {
  private _userRepository: IUserRepository;
  private _imageStorageService: IFileStorageService;
  constructor(
    userRepository: IUserRepository,
    imageStorageService: IFileStorageService
  ) {
    this._userRepository = userRepository;
    this._imageStorageService = imageStorageService;
  }
  async execute(
    userId: string,
    role: UserRole,
    file: UploadFileDto
  ): Promise<User> {
    const user = await this._userRepository.findById(userId);
    if (!user || !user.id || user.role !== role) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    if (user.imageUrl)
      await this._imageStorageService.removeFile(user.imageUrl);
    const imageUrl = await this._imageStorageService.uploadFile(file);

    const updated = await this._userRepository.addProfileImage(
      user.id,
      imageUrl
    );
    if (!updated) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    return updated;
  }
}
