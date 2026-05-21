import { UserRole } from '../../../domain/enums/user.enums';

export interface IGetEntityStatusUseCase<T> {
  execute(userId: string, role: UserRole): Promise<T>;
}
