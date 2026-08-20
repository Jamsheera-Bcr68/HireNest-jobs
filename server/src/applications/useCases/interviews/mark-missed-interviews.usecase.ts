import { InterviewStatusEnum } from "../../../domain/enums/status.enum";
import { IInterviewRepository } from "../../../domain/repository-interfaces/interview.repository.interface";
import { InterviewSchema } from "../../../infrastructure/database/models/interview.model";

export interface IUpdateMissedInterviews {
    execute():Promise<void>
}

export class UpdateMissedInterviews implements IUpdateMissedInterviews{
    constructor(private _interviewREpository:IInterviewRepository){}
   async execute(): Promise<void> {
        await this._interviewREpository.markMissedInterviews()
    }
}