import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
export interface IRemoveResumeUseCase {
  execute(userId: string, resumeId: string, role: UserRole): Promise<User>;
}
