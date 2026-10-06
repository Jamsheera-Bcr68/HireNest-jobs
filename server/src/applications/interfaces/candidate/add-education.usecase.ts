import { UserRole } from '../../../domain/enums/user.enums';
import { EducationDto } from '../../dtos/education.dto';

import { Education } from '../../../domain/entities/education.entity';

export interface IAddEducationUseCase {
  excecute(
    payload: EducationDto,
    userId: string,
    role: UserRole
  ): Promise<Education>;
}
