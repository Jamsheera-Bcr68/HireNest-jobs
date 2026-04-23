import { UserRole } from "../../../domain/enums/userEnums";

export interface IGetEntityStatusUseCase<T> {
  execute(userId: string,role:UserRole): Promise<T>;
}
