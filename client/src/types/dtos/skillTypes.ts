import type { UserRole } from '../../constants/types/user';

export type SkillStatusType = 'approved' | 'pending' | 'rejected' | 'removed';
export interface SkillType {
  id: string;
  skillName: string;
  createdBy?: UserRole;
  status?: SkillStatusType;
}
