import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { WorkMode } from '../../../domain/enums/WorkMode';
import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { IExperience } from '../../../domain/values/profileTypes';
import { ExperienceDto } from '../../../presentation/http/validators/profileValidation';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IAddExperienceUseCase } from '../../interfaces/candidate/IAddExperienceUseCase';
import { IExperienseRepository } from '../../../domain/repositoriesInterfaces/IExperienceRepository';
import { Experience } from '../../../domain/entities/Experience';

export class AddExperienceUseCase implements IAddExperienceUseCase {
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
    role: UserRole,
    payLoad: ExperienceDto
  ): Promise<User> {
    const user = await this._userRepository.findById(userId);
    if (!user || user.role !== role || !user.id)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    const expExist = user.experience.find(
      (exp) => exp.title == payLoad.title && exp.company == payLoad.company
    );
    if (expExist)
      throw new AppError(
        userMessages.error.EXPERIENCE_ALREADY_EXIST,
        statusCodes.CONFLICT
      );
    const currentExp = user.experience.find((exp) => exp.isWorking);
    if (currentExp && payLoad.isWorking)
      throw new AppError(
        userMessages.error.CURRENT_WORKING_EXIST,
        statusCodes.CONFLICT
      );
    const experience: Experience = {
      userId: userId,
      title: payLoad.title,
      company: payLoad.company,
      startDate: new Date(payLoad.startDate),
      endDate: payLoad.endDate ? new Date(payLoad?.endDate) : undefined,

      location: payLoad.location,
      description: payLoad.description,
      isWorking: payLoad.isWorking,
      mode: payLoad.mode as WorkMode,
    };

    const exp = await this._experienceRepository.addExperience(experience);
    //console.log('expereience created ', exp);

    if (!exp || !exp.id)
      throw new AppError(
        userMessages.error.EXPERIENCE_CREATION_FAILED,
        statusCodes.NOTFOUND
      );
    const updated = await this._userRepository.addExperience(userId, exp.id);
    if (!updated)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    return updated;
  }
}
