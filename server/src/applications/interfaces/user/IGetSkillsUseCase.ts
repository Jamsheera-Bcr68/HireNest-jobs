import { Skill } from '../../../domain/entities/skill';

export interface IGetAllSkillsUseCase {
  execute(): Promise<Array<Skill | null>>;
}
