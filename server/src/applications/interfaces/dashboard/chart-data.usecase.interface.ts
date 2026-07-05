import { UserRole } from "../../../domain/enums/user.enums";


export interface IDashboardChartDataUsecase<T>{
    execute(userId:string,role:UserRole):Promise<T[]>
} 