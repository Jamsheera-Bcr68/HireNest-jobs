import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { ExperienceDto } from '../../../presentation/http/validators/profile.validation';

export interface IAddExperienceUseCase {
  execute(
    userId: string,
    role: UserRole,

    payLoad: ExperienceDto
  ): Promise<User>;
}
