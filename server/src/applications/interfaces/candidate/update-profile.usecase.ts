import { CandidateProfileUpdateDto } from '../../dtos/candidate.dto';
import { TokenPayload } from '../services/token.service';
import { User } from '../../../domain/entities/user.entity';

export interface IProfileEditUsecase {
  execute(payload: CandidateProfileUpdateDto): Promise<User>;
}
