import { UserRole } from '../../../domain/enums/user.enums';
import { User } from '../../../domain/entities/user.entity';

export interface IRemoveExperienceUseCase {
  execute(
    userId: string,
    role: UserRole,

    expId: string
  ): Promise<User>;
}
