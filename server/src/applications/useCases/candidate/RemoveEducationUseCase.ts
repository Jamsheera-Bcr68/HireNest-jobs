import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { IEducationRepository } from '../../../domain/repositoriesInterfaces/IEducationRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { IRemoveEducationUseCase } from '../../interfaces/candidate/IRemoveEducationUseCase';
import { AppError } from '../../../domain/errors/AppError';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import mongoose from 'mongoose';

export class RemoveEducationUseCase implements IRemoveEducationUseCase {
  private _educationRepository: IEducationRepository;
  private _userRepository: IUserRepository;
  constructor(
    educationRepository: IEducationRepository,
    userRepository: IUserRepository
  ) {
    this._educationRepository = educationRepository;
    this._userRepository = userRepository;
  }

  async execute(eduId: string, userId: string, role: UserRole): Promise<User> {
    const user = await this._userRepository.findById(userId);
    if (!user || !user.id || user.role !== role)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    const updatedUser = await this._userRepository.removeEducation(
      user.id,
      eduId
    );
    await this._educationRepository.deleteById(eduId);

    if (!updatedUser)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    return updatedUser;
  }
}
