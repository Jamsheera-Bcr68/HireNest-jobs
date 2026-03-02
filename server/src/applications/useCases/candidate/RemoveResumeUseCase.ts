import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IRemoveResumeUseCase } from '../../interfaces/candidate/IRemoveResumeUseCase';
import { IFileStorageService } from '../../interfaces/services/IFileStorageServices';

export class RemoveResumUseCase implements IRemoveResumeUseCase {
  constructor(
    private userRepository: IUserRepository,
    private fileStorageService: IFileStorageService
  ) {
    this.userRepository = userRepository;
    this.fileStorageService = fileStorageService;
  }
  async execute(
    userId: string,
    resumeId: string,
    role: UserRole
  ): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.id || user.role !== role)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const res = user.resumes.find((resume) => resume.id === resumeId);
    if (!res)
      throw new AppError(
        userMessages.error.RESUME_ALREADY_DELETED,
        statusCodes.CONFLICT
      );

    await this.fileStorageService.removeFile(res.url);
    const updated = await this.userRepository.removeResume(userId, resumeId);
    if (!updated)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    return updated;
  }
}
