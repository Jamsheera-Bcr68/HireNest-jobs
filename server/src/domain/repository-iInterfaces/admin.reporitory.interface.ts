import { Admin } from '../entities/admin.entity';
import { IBaseRepository } from './base-repository.interface';

export interface IAdminRepository extends IBaseRepository<Admin> {
  findByEmail(email: string): Promise<Admin | null>;
  updateGoogleId(email: string, googleId: string): Promise<Admin | null>;
  updatePassword(id: string, password: string): Promise<void>;
  updateResetToken(
    userId: string,
    hashedToken: string,
    resetTokenExpiry: Date
  ): Promise<void>;

  clearResetToken(id: string): Promise<void>;
}
