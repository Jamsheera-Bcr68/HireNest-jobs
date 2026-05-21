import { UserRole } from '../../../domain/enums/user.enums';
export interface IGetEntitySatusUseCase<T> {
  execute(userId: string, role: UserRole): Promise<T>;
}
