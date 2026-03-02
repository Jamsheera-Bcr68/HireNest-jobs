import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';

export interface IGetUserUseCase {
  execute(userId: string, role: UserRole): Promise<User>;
}
