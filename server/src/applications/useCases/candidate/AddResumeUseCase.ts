import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { UploadFileDto } from '../../Dtos/uploadFileDto';
import { IAddResumeUseCase } from '../../interfaces/candidate/IAddResumeUseCase';
import { IResume } from '../../../domain/values/profileTypes';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { IFileStorageService } from '../../interfaces/services/IFileStorageServices';

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
  ): Promise<User> {
    const user = await this._userRepository.findById(userId);
    if (!user || !user.id || user.role !== role)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const imageUrl = await this._fileStorageService.uploadFile(data);
    const payload: IResume = {
      url: imageUrl,
      name: data.originalName,
      isDefault: false,
      uploadedAt: new Date(),
    };
    const updatedUser = await this._userRepository.addResume(payload, userId);
    if (!updatedUser)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    return updatedUser;
  }
}
