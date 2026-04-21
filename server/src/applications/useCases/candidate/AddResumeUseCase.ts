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
import { generalMessages } from '../../../shared/constants/messages/generalMessages';

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
