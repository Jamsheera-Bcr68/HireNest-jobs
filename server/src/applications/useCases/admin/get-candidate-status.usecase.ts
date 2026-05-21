import { IGetEntityStatusUseCase } from '../../interfaces/admin/get-admin-entity-status.usecase.js';
import type { CandidateStatus } from '../../dtos/candidate.dto';
import { IUserRepository } from '../../../domain/repository-iInterfaces/user-repository.interface.js';

export class GetCandidateStatusUseCase implements IGetEntityStatusUseCase<CandidateStatus> {
  constructor(private userRepository: IUserRepository) {}
  async execute(): Promise<CandidateStatus> {
    const status = await this.userRepository.getCandidateStatus();
    return status;
  }
}
