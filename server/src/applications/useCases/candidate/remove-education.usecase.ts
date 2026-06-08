import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { IEducationRepository } from '../../../domain/repository-interfaces/education-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { IRemoveEducationUseCase } from '../../interfaces/candidate/remove-education.usecase';
import { AppError } from '../../../domain/errors/app-error';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
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
