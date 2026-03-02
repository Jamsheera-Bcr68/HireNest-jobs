export interface IChangePasswordUsecase {
  execute(
    userId: string,
    email: string,
    password: string,
    current_password: string
  ): Promise<void>;
}
