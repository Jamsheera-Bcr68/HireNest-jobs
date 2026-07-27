import { UserRole } from "../../../domain/enums/user.enums";

export interface IGetEntityDetailsUsecase<T> {
  execute(meetId: string, userId: string, role: UserRole): Promise<T>;
}
