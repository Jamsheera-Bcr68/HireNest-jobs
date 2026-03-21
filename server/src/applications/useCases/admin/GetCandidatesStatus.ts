import { IGetEntityStatusUseCase } from '../../interfaces/admin/IGetEntityStatusUseCase';
import type { CandidateStatus } from '../../Dtos/candidateDto';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';

export class GetCandidateStatusUseCase implements IGetEntityStatusUseCase<CandidateStatus> {
  constructor(private userRepository: IUserRepository) {}
  async execute(): Promise<CandidateStatus> {
    const status = await this.userRepository.getCandidateStatus();
    return status;
  }
}
