import { UserRole } from '../enums/userEnums';
import { SkillStatus } from '../enums/skillEnum';

export interface Skill {
  id: string;
  skillName: string;
  createdBy: UserRole;
  createdAt?: Date;
  status?: SkillStatus;
}
