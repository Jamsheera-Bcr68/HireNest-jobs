
import { UserRole } from '../../../domain/enums/user.enums';
import { EducationDto } from '../../dtos/education.dto';
import { User } from '../../../domain/entities/user.entity';
import { Education } from '../../../domain/entities/education.entity';

export interface IAddEducationUseCase {
  excecute(
    payload: EducationDto,
    userId: string,
    role: UserRole
  ): Promise<Education>;
}
