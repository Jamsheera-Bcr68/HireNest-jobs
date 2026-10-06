import { EducationDto } from '../../dtos/education.dto';
import { User } from '../../../domain/entities/user.entity';
import { Education } from '../../../domain/entities/education.entity';

export interface IEditEducationUseCase {
  execute(
    payload: EducationDto,
    eduId: string,
    role: string,
    userId: string
  ): Promise<Education>;
}
