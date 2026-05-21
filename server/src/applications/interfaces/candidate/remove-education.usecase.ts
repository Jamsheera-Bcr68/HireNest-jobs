import { UserRole } from '../../../domain/enums/user.enums';
import { User } from '../../../domain/entities/user.entity';

export interface IRemoveEducationUseCase {
  execute(eduId: string, userId: string, role: UserRole): Promise<User>;
}
