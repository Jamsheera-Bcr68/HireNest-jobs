import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { UploadFileDto } from '../../dtos/upload-file.dto';
import { IEditProfileImageUsecase } from '../../interfaces/user/update-image.usecase';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';

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
