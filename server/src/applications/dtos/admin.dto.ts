import { Admin } from '../../domain/entities/admin.entity';
import { UserRole } from '../../domain/enums/user.enums';

export interface AdminDto {
  id: string;
  role: UserRole;
  email: string;
}
export interface AdminLoginOutPutDto {
  admin: Admin;
  accessToken: string;
  refreshToken: string;
}

export interface AdminloginInput {
  email: string;
  password: string;
}
