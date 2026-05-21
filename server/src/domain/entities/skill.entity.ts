import { UserRole } from '../enums/user.enums';
import { SkillStatus } from '../enums/skill.enum';

export interface Skill {
  id: string;
  skillName: string;

  createdBy: UserRole;
  reviewedAt?: Date;
  userId?: string;
  createdAt: Date;
  status?: SkillStatus;
  reasonForRemove?: string;
  reasonForReject?: string;
  postUsedCount: number;
  candidateUsedCount: number;
}
