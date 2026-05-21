import { CandidateFilterType } from '../../types/candidate.type';
import { type PaginatedEntities } from '../../types/candidate.type';
export interface IAdminGetEntitiesUseCase<T> {
  execute(filter: CandidateFilterType): Promise<PaginatedEntities<T>>;
}
