import { Skill } from '../../../domain/entities/skill';
import { UserRole } from '../../../domain/enums/userEnums';
import { SkillListDto } from '../../Dtos/skillDto';

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
