import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IRemoveResumeUseCase } from '../../interfaces/candidate/remove-resume.usecase';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';

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
