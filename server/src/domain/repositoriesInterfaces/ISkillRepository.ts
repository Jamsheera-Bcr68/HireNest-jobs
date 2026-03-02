import { IBaseRepository } from './IBaseRepository';
import { Skill } from '../entities/skill';

export interface ISkillRepository extends IBaseRepository<Skill> {
  getAllSkills(): Promise<Array<Skill | null>>;
}
