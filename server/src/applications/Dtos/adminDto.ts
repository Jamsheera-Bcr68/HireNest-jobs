import { Admin } from '../../domain/entities/admin';
import { UserRole } from '../../domain/enums/userEnums';

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
