import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { ExperienceDto } from '../../../presentation/http/validators/profileValidation';

export interface IEditExperienceUseCase {
  execute(
    userId: string,
    expId: string,
    role: UserRole,
    payLoad: ExperienceDto
  ): Promise<User>;
}
