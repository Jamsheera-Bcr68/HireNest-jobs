import { UserRole } from "../../../domain/enums/user.enums";


export interface IDashboardDataListUsecase<T>{
    execute(userId:string,role:UserRole):Promise<T[]>
} 