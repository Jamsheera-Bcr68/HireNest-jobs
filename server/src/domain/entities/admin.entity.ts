import { UserRole } from '../enums/user.enums';

export interface Admin {
  id: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date | undefined;
  googleId?: string | undefined;
  role: UserRole;
}
