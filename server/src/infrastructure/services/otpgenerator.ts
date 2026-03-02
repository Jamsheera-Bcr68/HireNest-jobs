import { IGenerateOtpService } from '../../applications/interfaces/services/IGeneratorOtpService';

export class OtpGenerator implements IGenerateOtpService {
  generate(): string {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log('otp generated ', otp);

    return otp.toString();
  }
}
