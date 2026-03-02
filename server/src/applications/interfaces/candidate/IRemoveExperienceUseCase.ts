import { UserRole } from '../../../domain/enums/userEnums';
import { User } from '../../../domain/entities/User';

export interface IRemoveExperienceUseCase {
  execute(
    userId: string,
    role: UserRole,

    expId: string
  ): Promise<User>;
}
