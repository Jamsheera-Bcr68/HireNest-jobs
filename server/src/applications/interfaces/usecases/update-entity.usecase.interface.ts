import { UserRole } from '../../../domain/enums/userEnums';

export interface IUpdateEntityUseCase<T, D> {
  execute(
    id: string,
    role: UserRole,
    userId: string,
    data: Partial<T>
  ): Promise<D>;
}
