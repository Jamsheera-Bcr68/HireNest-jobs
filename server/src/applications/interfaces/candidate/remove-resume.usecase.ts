import { UserRole } from '../../../domain/enums/user.enums';
export interface IRemoveResumeUseCase {
  execute(userId: string, resumeId: string, role: UserRole): Promise<void>;
}
