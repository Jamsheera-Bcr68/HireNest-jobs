import { CandidateProfileUpdateDto } from '../../Dtos/candidateDto';
import { TokenPayload } from '../services/ITokenService';
import { User } from '../../../domain/entities/User';

export interface IProfileEditUsecase {
  execute(payload: CandidateProfileUpdateDto): Promise<User>;
}
