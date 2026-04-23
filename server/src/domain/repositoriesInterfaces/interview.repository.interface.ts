import { IBaseRepository } from "./IBaseRepository";
import { Interview } from "../entities/interview.entity";
import { IInterviewDocument } from "../../infrastructure/database/models/interview.model";

export interface IInterviewRepository extends IBaseRepository<Interview>{

}