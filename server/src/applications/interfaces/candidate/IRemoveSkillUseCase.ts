import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';

export interface IRemoveSkillFromProfileUseCase {
  execute(userId: string, skillId: string, role: UserRole): Promise<User>;
}
