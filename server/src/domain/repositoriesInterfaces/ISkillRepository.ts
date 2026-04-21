import { IBaseRepository } from './IBaseRepository';
import { Skill } from '../entities/skill';

export interface ISkillRepository extends IBaseRepository<Skill> {
  getAllSkills(
    filter: Partial<Skill>,
    limit?: number,
    page?: number,
    search?: string,
    sortBy?: string
  ): Promise<Skill[]>;
  updatePostUsedCount(id: string[], action: 'add' | 'remove'): Promise<void>;
  updateCandidateUsedCount(id: string, action: 'add' | 'remove'): Promise<void>;
  getSkillByUserId(userId: string): Promise<Skill[]>;
  count(filter: Partial<Skill>): Promise<number>;
  findBySkillName(skillName: string): Promise<Skill | null>;
   findByIds(skillIds: string[]): Promise<Skill[]>;
}
