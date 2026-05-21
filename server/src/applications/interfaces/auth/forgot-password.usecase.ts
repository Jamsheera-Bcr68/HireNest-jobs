import { UserRole } from '../../../domain/enums/user.enums';

export interface IForgotPasswordUsecase {
  execute(email: string, role: UserRole): Promise<void>;
}
