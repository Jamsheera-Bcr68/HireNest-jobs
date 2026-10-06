import { UserRole } from '../../../domain/enums/user.enums';

export interface IRemoveEducationUseCase {
  execute(eduId: string, userId: string, role: UserRole): Promise<void>;
}
