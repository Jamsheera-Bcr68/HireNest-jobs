import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
export interface IRemoveProfileImageUseCase {
  execute(userId: string, role: UserRole): Promise<User>;
}
