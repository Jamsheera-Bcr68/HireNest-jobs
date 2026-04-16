import { UserRole } from '../../../domain/enums/userEnums';
export interface IGetEntitySatusUseCase<T> {
  execute(userId: string, role: UserRole): Promise<T>;
}
