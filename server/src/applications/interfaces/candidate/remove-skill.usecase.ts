import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';

export interface IRemoveSkillFromProfileUseCase {
  execute(userId: string, skillId: string, role: UserRole): Promise<User>;
}
