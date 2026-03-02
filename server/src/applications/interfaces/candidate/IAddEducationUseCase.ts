import { Education } from '../../../domain/entities/Education';
import { UserRole } from '../../../domain/enums/userEnums';
import { EducationDto } from '../../Dtos/educationDto';
import { User } from '../../../domain/entities/User';

export interface IAddEducationUseCase {
  excecute(
    payload: EducationDto,
    userId: string,
    role: UserRole
  ): Promise<User>;
}
