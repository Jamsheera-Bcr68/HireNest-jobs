import { Skill } from '../../../domain/entities/skill.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { SkillListDto } from '../../dtos/skill.dto';

export interface IGetAllSkillsUseCase {
  execute(
    userId: string,
    role: UserRole,
    filter: Partial<Skill>,
    limit?: number,
    page?: number,
    search?: string,
    sortBy?: string
  ): Promise<SkillListDto>;
}
