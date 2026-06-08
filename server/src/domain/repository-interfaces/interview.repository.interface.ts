import { IBaseRepository } from './base-repository.interface';
import { Interview } from '../entities/interview.entity';

import {
  AggregatedInterviewDto,
  InterviewFilterDto,
} from '../../applications/dtos/interview.dto';

export interface IInterviewRepository extends IBaseRepository<Interview> {
  count(filter?: Partial<Interview>): Promise<number>;
  getAllInterviews(
    filter: Partial<InterviewFilterDto>
  ): Promise<{ interviews: AggregatedInterviewDto[]; totalDocs: number }>;
}
