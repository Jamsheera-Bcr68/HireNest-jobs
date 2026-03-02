import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';

export interface IAddSkillToProfileUseCase {
  execute(id: string, skillId: string, role: UserRole): Promise<User>;
}
