import { UserRole } from '../enums/userEnums';

export interface Admin {
  id: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date | undefined;
  googleId?: string | undefined;
  role: UserRole;
}
