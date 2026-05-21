import { EducationDto } from '../../dtos/education.dto';
import { User } from '../../../domain/entities/user.entity';

export interface IEditEducationUseCase {
  execute(
    payload: EducationDto,
    eduId: string,
    role: string,
    userId: string
  ): Promise<User>;
}
