export interface IEmailService {
  sendOtp(email: string, otp: string): void;
  sendResetPasswordLink(email: string, resetLink: string): Promise<void>;
}
