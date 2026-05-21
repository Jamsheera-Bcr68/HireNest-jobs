import { userProfileDto } from '../dtos/user.dto';
import { User } from '../../domain/entities/user.entity';

export type CandidateFilterType = {
  status?: 'active' | 'suspended' | 'all';
  search?: string;
  education?: string;
  page?: number;
  limit?: number;
};

export type PaginatedCandidates = {
  candidates: User[];
  totalDocs: number;
};
export type PaginatedEntities<T> = {
  entities: T[];
  totalDocs: number;
};
