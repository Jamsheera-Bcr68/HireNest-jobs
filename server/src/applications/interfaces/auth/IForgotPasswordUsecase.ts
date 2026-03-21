import { UserRole } from '../../../domain/enums/userEnums';

export interface IForgotPasswordUsecase {
  execute(email: string, role: UserRole): Promise<void>;
}
