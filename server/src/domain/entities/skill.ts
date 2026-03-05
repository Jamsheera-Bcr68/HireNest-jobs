import { UserRole } from '../enums/userEnums';
import { SkillStatus } from '../enums/skillEnum';

export interface Skill {
  id: string;
  skillName: string;
  createdBy: UserRole;
  userId?: string;
  createdAt?: Date;
  status?: SkillStatus;
}
