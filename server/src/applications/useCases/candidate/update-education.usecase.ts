import { IEditEducationUseCase } from '../../interfaces/candidate/update-education.usecase';
import { IEducationRepository } from '../../../domain/repository-iInterfaces/education-repository.interface';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface';
import { EducationDto } from '../../dtos/education.dto';
import { Education } from '../../../domain/entities/education.entity';
import { User } from '../../../domain/entities/user.entity';
import {
  EducationLevel,
  EducationStatus,
} from '../../../domain/enums/education.enum';
import { AppError } from '../../../domain/errors/app-error';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

export class EditEducationUseCase implements IEditEducationUseCase {
  private _educationRepository: IEducationRepository;
  private _userRepository: IUserRepository;
  constructor(
    educationRepository: IEducationRepository,
    userRepository: IUserRepository
  ) {
    this._educationRepository = educationRepository;
    this._userRepository = userRepository;
  }
  async execute(
    payload: EducationDto,
    eduId: string,
    role: string,
    userId: string
  ): Promise<User> {
    payload = payload as Education;
    const educations = await this._educationRepository.getAllEducations(userId);

    let eduExist = null;
    if (payload.level == EducationLevel.SSLC) {
      eduExist = educations.find(
        (edu) => edu.level == EducationLevel.SSLC && edu.id !== eduId
      );
      if (eduExist)
        throw new AppError(
          userMessages.error.EDUCATION_LEVEL_EXIST.SSLC,
          statusCodes.CONFLICT
        );
    }
    if (payload.level == EducationLevel.HS) {
      eduExist = educations.find(
        (edu) => edu.level === EducationLevel.HS && edu.id !== eduId
      );
      if (eduExist)
        throw new AppError(
          userMessages.error.EDUCATION_LEVEL_EXIST.HS,
          statusCodes.CONFLICT
        );
    }
    if (payload.status == EducationStatus.ONGOING) {
      eduExist = educations.find(
        (edu) => edu.status == EducationStatus.ONGOING && edu.id !== eduId
      );
      if (eduExist)
        throw new AppError(
          userMessages.error.CURRENT_EDUCATION_EXIST,
          statusCodes.CONFLICT
        );
    }
    if (payload.status == EducationStatus.ONGOING) payload.completedYear = 0;

    const education = await this._educationRepository.editEducation(
      eduId,
      payload
    );

    if (!education || !education.id) {
      console.log('edu id', eduId);

      throw new AppError(
        userMessages.error.EDUCATION_NOTFOUND,
        statusCodes.NOTFOUND
      );
    }
    const updatedUser = await this._userRepository.findById(userId);

    console.log('updated user from add education', updatedUser, userId);
    if (!updatedUser)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    return updatedUser;
  }
}
