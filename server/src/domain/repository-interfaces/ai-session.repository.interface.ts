import { AiSession } from "../entities/ai-session.entity";
import { IBaseRepository } from "./base-repository.interface";

export interface IAiSessionRepository extends IBaseRepository<AiSession>{
    getSessionData(interviewId:string):Promise<AiSession|null>
}