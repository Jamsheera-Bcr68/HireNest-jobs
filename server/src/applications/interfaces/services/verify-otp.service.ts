export interface IVerifyOtpService {
  execute(email: string, otp: string): Promise<boolean>;
}
