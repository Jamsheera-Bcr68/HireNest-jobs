import { CandidateFilterType } from '../../types/candidateType';
import { type PaginatedEntities } from '../../types/candidateType';
export interface IAdminGetEntitiesUseCase<T> {
  execute(filter: CandidateFilterType): Promise<PaginatedEntities<T>>;
}
