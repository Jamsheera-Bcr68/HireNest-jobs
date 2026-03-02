import { EducationDto } from '../../Dtos/educationDto';
import { User } from '../../../domain/entities/User';

export interface IEditEducationUseCase {
  execute(
    payload: EducationDto,
    eduId: string,
    role: string,
    userId: string
  ): Promise<User>;
}
