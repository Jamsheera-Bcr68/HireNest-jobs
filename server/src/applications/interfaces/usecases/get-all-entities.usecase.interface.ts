import { UserRole } from '../../../domain/enums/userEnums';

export interface IGetAllEntitiesUsecase<T, F> {
  execute(filter: Partial<F>, role?: UserRole, userId?: string): Promise<T>;
}
