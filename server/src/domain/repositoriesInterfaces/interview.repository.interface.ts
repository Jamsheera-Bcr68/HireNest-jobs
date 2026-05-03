import { IBaseRepository } from './IBaseRepository';
import { Interview } from '../entities/interview.entity';

import {
  AggregatedInterviewDto,
  InterviewFilterDto,
} from '../../applications/Dtos/interview.dto';

export interface IInterviewRepository extends IBaseRepository<Interview> {
  count(filter?: Partial<Interview>): Promise<number>;
  getAllInterviews(
    filter: Partial<InterviewFilterDto>
  ): Promise<{ interviews: AggregatedInterviewDto[]; totalDocs: number }>;
}
