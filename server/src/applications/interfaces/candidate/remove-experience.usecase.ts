import { UserRole } from '../../../domain/enums/user.enums';

export interface IRemoveExperienceUseCase {
  execute(
    userId: string,
    role: UserRole,

    expId: string
  ): Promise<void>;
}
