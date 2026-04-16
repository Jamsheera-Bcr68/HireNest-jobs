import { UserRole } from '../../../domain/enums/userEnums';
export interface IUpdateEntityStatusUseCase<T, S> {
  execute(
    id: string,
    userId: string,
    role: UserRole,
    status: S,
    reason?: string
  ): Promise<void>;
}
