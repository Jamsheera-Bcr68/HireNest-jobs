import { UserRole } from "../../../domain/enums/user.enums";

export interface IDashboardCardDataUsecase<T> {
    execute(userId:string,role:UserRole):Promise<T>
}