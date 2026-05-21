import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';

export interface IGetUserUseCase {
  execute(userId: string, role: UserRole): Promise<User>;
}
