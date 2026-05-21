import { UserRole } from '../../../domain/enums/user.enums';
export interface IUpdateEntityStatusUseCase<T, S> {
  execute(
    id: string,
    userId: string,
    role: UserRole,
    status: S,
    reason?: string
  ): Promise<void | T>;
}
