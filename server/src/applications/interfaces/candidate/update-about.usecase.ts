import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';

export interface IEditAboutUseCase {
  execute(userId: string, role: UserRole, about: string): Promise<User>;
}
