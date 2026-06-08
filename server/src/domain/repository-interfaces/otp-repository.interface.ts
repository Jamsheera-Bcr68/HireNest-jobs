import { IOtpDocument } from '../../infrastructure/database/models/otp.model';

export interface IOtpRepository {
  save(email: string, otp: string): Promise<Date>;
  findOne(email: string): Promise<IOtpDocument | null>;

  verifyOtp(email: string, otp: string): Promise<boolean>;
}
