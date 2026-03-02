import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';

export interface IEditAboutUseCase {
  execute(userId: string, role: UserRole, about: string): Promise<User>;
}
