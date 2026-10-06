import { CandidateProfileUpdateDto } from '../../dtos/candidate.dto';

import { User } from '../../../domain/entities/user.entity';

export interface IProfileEditUsecase {
  execute(payload: CandidateProfileUpdateDto): Promise<User>;
}
