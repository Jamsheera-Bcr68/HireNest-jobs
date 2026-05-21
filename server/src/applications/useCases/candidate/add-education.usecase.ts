import { Education } from '../../../domain/entities/education.entity';
import { User } from '../../../domain/entities/user.entity';
import {
  EducationLevel,
  EducationStatus,
} from '../../../domain/enums/education.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IEducationRepository } from '../../../domain/repository-iInterfaces/education-repository.interface';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { EducationDto } from '../../dtos/education.dto';
import { IAddEducationUseCase } from '../../interfaces/candidate/add-education.usecase';

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
