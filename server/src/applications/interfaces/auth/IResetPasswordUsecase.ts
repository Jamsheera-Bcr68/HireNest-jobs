export interface IResetPasswordUsecase {
  execute(email: string, password: string, resetToken: string): Promise<void>;
}
