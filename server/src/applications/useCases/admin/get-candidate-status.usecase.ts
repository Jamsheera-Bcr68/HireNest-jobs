import { IGetEntityStatusUseCase } from '../../interfaces/admin/get-admin-entity-status.usecase.js';
import type { CandidateStatus } from '../../dtos/candidate.dto.js';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface.js';

export class GetCandidateStatusUseCase implements IGetEntityStatusUseCase<CandidateStatus> {
  constructor(private userRepository: IUserRepository) {}
  async execute(): Promise<CandidateStatus> {
    const status = await this.userRepository.getCandidateStatus();
    return status;
  }
}
