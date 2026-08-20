import { IBaseRepository } from './base-repository.interface';
import { Interview } from '../entities/interview.entity';

import {
  AggregatedInterviewDto,
  InterviewFilterDto,
} from '../../applications/dtos/interview.dto';
import { InterviewStatusEnum } from '../enums/status.enum';
import { InterviewResult } from '../enums/interview.enum';
import { DashboardUpcomingInterview } from '../../applications/types/candidate-dashboard.types';

export interface IInterviewRepository extends IBaseRepository<Interview> {
  count(filter?: Partial<Interview>): Promise<number>;
  getAllInterviews(
    filter: Partial<InterviewFilterDto>
  ): Promise<{ interviews: AggregatedInterviewDto[]; totalDocs: number }>

  getInterviewCountByStatus():Promise<{_id:InterviewStatusEnum,count:number}[]>
  getCountByResult():Promise<{_id:InterviewResult,count:number}[]>
  getInterview(filter:InterviewFilterDto):Promise<AggregatedInterviewDto|null>
  markMissedInterviews():Promise<void>
}
