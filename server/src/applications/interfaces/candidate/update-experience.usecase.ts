import { Experience } from '../../../domain/entities/experience.entity';
import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { ExperienceDto } from '../../../presentation/http/validators/profile.validation';

export interface IEditExperienceUseCase {
  execute(
    userId: string,
    expId: string,
    role: UserRole,
    payLoad: ExperienceDto
  ): Promise<Experience>;
}
