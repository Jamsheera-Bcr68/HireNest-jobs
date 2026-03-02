import { UserRole } from '../enums/userEnums';

export interface Admin {
  id: string;
  email: string;
  password: string;
  googleId?: string | undefined;
  role: UserRole;
}
