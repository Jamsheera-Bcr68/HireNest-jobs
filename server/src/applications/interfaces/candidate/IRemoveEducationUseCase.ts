import { UserRole } from '../../../domain/enums/userEnums';
import { User } from '../../../domain/entities/User';

export interface IRemoveEducationUseCase {
  execute(eduId: string, userId: string, role: UserRole): Promise<User>;
}
