import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { ExperienceDto } from '../../../presentation/http/validators/profileValidation';

export interface IAddExperienceUseCase {
  execute(
    userId: string,
    role: UserRole,

    payLoad: ExperienceDto
  ): Promise<User>;
}
