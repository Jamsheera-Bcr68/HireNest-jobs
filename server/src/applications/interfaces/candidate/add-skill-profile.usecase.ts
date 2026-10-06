import { UserRole } from '../../../domain/enums/user.enums';
import { CandidateSkillDto } from '../../dtos/skill.dto';

export interface IAddSkillToProfileUseCase {
  execute(
    id: string,
    skillId: string,
    role: UserRole
  ): Promise<CandidateSkillDto>;
}
