import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { UploadFileDto } from '../../dtos/upload-file.dto';
import { IAddResumeUseCase } from '../../interfaces/candidate/add-redume.usecase';
import { IResume } from '../../../domain/values/profile-types';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';
import { generalMessages } from '../../../shared/constants/messages/general.messages';

export class AddResumeUseCase implements IAddResumeUseCase {
  private _userRepository: IUserRepository;
  private _fileStorageService: IFileStorageService;

  constructor(
    userRepository: IUserRepository,
    fileStorageService: IFileStorageService
  ) {
    this._userRepository = userRepository;
    this._fileStorageService = fileStorageService;
  }
  async execute(
    data: UploadFileDto,
    userId: string,
    role: UserRole
  ): Promise<IResume> {
    const user = await this._userRepository.findById(userId);
    if (!user || !user.id || user.role !== role)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const imageUrl = await this._fileStorageService.uploadFile(data);
    const newResume: IResume = {
      url: imageUrl,
      name: data.originalName,
      isDefault: false,
      uploadedAt: new Date(),
    };
    let resume = await this._userRepository.addResume(newResume, userId);
    if (!resume) {
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Resume'),
        statusCodes.NOTFOUND
      );
    }
    return resume;
  }
}
