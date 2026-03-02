import { Experience } from '../../../domain/entities/Experience';
import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { WorkMode } from '../../../domain/enums/WorkMode';
import { AppError } from '../../../domain/errors/AppError';
import { IExperienseRepository } from '../../../domain/repositoriesInterfaces/IExperienceRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';

import { ExperienceDto } from '../../../presentation/http/validators/profileValidation';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IEditExperienceUseCase } from '../../interfaces/candidate/IEditExperienceUseCase';
import { updateExpDto } from '../../Dtos/updateExpDto';

export class EditExperienceUseCase implements IEditExperienceUseCase {
  private _userRepository: IUserRepository;
  private _experienceRepository: IExperienseRepository;
  constructor(
    userRepository: IUserRepository,
    experienceRepository: IExperienseRepository
  ) {
    this._userRepository = userRepository;
    this._experienceRepository = experienceRepository;
  }
  async execute(
    userId: string,
    expId: string,
    role: UserRole,
    payLoad: ExperienceDto
  ): Promise<User> {
    const exp = await this._experienceRepository.findById(expId);
    if (!exp || !exp.id)
      throw new AppError(
        userMessages.error.EXPEIENCE_NOT_FOUND,
        statusCodes.NOTFOUND
      );

    const user = await this._userRepository.findById(userId);
    if (!user || user.role !== role || !user.id)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);

    const isWorkingExp = user.experience.find(
      (exp) => exp.isWorking && exp.id !== expId
    );
    if (isWorkingExp && payLoad.isWorking)
      throw new AppError(
        userMessages.error.CURRENT_WORKING_EXIST,
        statusCodes.CONFLICT
      );
    const expExist = user.experience.find(
      (exp) => exp.title == payLoad.title && exp.company == payLoad.company
    );
    if (expExist)
      throw new AppError(
        userMessages.error.EXPERIENCE_ALREADY_EXIST,
        statusCodes.CONFLICT
      );
    const experience: updateExpDto = {
      userId: user.id,
      title: payLoad.title,
      company: payLoad.company,
      startDate: new Date(payLoad.startDate),
      endDate: payLoad.endDate ? new Date(payLoad?.endDate) : undefined,

      location: payLoad.location,
      description: payLoad.description,
      isWorking: payLoad.isWorking,
      mode: payLoad.mode as WorkMode,
    };

    const updatedExp = await this._experienceRepository.editExperience(
      exp.id,
      experience
    );
    if (!updatedExp)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    const updated = await this._userRepository.findById(user.id);
    if (!updated)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);

    return updated;
  }
}
