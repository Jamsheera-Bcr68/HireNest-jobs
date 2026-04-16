import { UserRole } from '../enums/userEnums';
import { SkillStatus } from '../enums/skillEnum';

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
