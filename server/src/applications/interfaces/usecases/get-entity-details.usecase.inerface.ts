import { UserRole } from "../../../domain/enums/user.enums";

export interface IGetEntityDetailsUsecase<T> {
  execute(id: string, userId: string, role: UserRole): Promise<T>;
}
