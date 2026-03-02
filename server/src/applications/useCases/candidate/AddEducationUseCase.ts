import { Education } from '../../../domain/entities/Education';
import { User } from '../../../domain/entities/User';
import {
  EducationLevel,
  EducationStatus,
} from '../../../domain/enums/EducationEnum';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IEducationRepository } from '../../../domain/repositoriesInterfaces/IEducationRepository';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { EducationDto } from '../../Dtos/educationDto';
import { IAddEducationUseCase } from '../../interfaces/candidate/IAddEducationUseCase';

export class AddEducationUseCase implements IAddEducationUseCase {
  private _educationRepository: IEducationRepository;
  private _userRepository: IUserRepository;
  constructor(
    educationRepository: IEducationRepository,
    userRepository: IUserRepository
  ) {
    this._educationRepository = educationRepository;
    this._userRepository = userRepository;
  }
  async excecute(
    payload: EducationDto,
    userId: string,
    role: UserRole
  ): Promise<User> {
    payload = { ...payload, userId } as Education;
    const educations = await this._educationRepository.getAllEducations(userId);

    let eduExist = null;
    if (payload.level == EducationLevel.SSLC) {
      eduExist = educations.find((edu) => edu.level == EducationLevel.SSLC);
      if (eduExist)
        throw new AppError(
          userMessages.error.EDUCATION_LEVEL_EXIST.SSLC,
          statusCodes.CONFLICT
        );
    }
    if (payload.level == EducationLevel.HS) {
      eduExist = educations.find((edu) => edu.level == EducationLevel.HS);
      if (eduExist)
        throw new AppError(
          userMessages.error.EDUCATION_LEVEL_EXIST.HS,
          statusCodes.CONFLICT
        );
    }
    if (payload.status == EducationStatus.ONGOING) {
      eduExist = educations.find(
        (edu) => edu.status == EducationStatus.ONGOING
      );
      if (eduExist)
        throw new AppError(
          userMessages.error.CURRENT_EDUCATION_EXIST,
          statusCodes.CONFLICT
        );
    }
    if (payload.status == EducationStatus.ONGOING) payload.completedYear = 0;

    const education = await this._educationRepository.addEducation(payload);
    if (!education || !education.id)
      throw new AppError(
        userMessages.error.EDUCATION_NOTFOUND,
        statusCodes.NOTFOUND
      );
    const updatedUser = await this._userRepository.addEducation(
      userId,
      education.id
    );
    console.log('updated user from add education', updatedUser, userId);
    if (!updatedUser)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    return updatedUser;
  }
}
