export interface ISendOtpService {
  execute(email: string): Promise<Date>;
}
