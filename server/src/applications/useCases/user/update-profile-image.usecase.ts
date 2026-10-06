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
    imageStorageService: IFileStorageService,
    private _fileStorageService: IFileStorageService
  ) {
    this._userRepository = userRepository;
    this._imageStorageService = imageStorageService;
  }
  async execute(
    userId: string,
    role: UserRole,
    file: UploadFileDto
  ): Promise<string | undefined> {
    const user = await this._userRepository.findById(userId);
    console.log('from candidate profile image usecase', user?.imageUrl);
    if (!user || !user.id || user.role !== role) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    if (user.imageUrl) await this._fileStorageService.removeFile(user.imageUrl);
    console.log('from candidate profile image usecase');

    const imageUrl = await this._fileStorageService.uploadFile(
      file,
      'candidates/profile-images',
      'jpg'
    );

    const updated = await this._userRepository.addProfileImage(
      user.id,
      imageUrl
    );
    if (!updated) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    const url = updated.imageUrl
      ? await this._fileStorageService.getFileUrl(updated.imageUrl)
      : undefined;
    return url;
  }
}
