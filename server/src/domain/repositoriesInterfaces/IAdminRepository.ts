import { Admin } from '../entities/admin';

export interface IAdminRepository {
  findByEmail(email: string): Promise<Admin | null>;
  updateGoogleId(email: string, googleId: string): Promise<Admin | null>;
}
