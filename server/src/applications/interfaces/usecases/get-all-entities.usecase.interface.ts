import { UserRole } from '../../../domain/enums/user.enums';

export interface IGetAllEntitiesUsecase<T, F> {
  execute(filter: Partial<F>, role?: UserRole, userId?: string): Promise<T>;
}
