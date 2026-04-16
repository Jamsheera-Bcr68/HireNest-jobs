import { SkillStatus } from '../../domain/enums/skillEnum';
import { UserRole } from '../../domain/enums/userEnums';
export interface UserSkillDto {
  id: string;
  skillName: string;
  createdBy?: UserRole;
  status?: SkillStatus;
  reviewedAt?: Date;
  usedCount?: number;
  usedCandidateCount?: number;
  createdAt: Date;
}
export type SkillStatusCardDto = {
  total: number;
  active: number;
  pending: number;
  rejected: number;
  removed: number;
};
export type SkillListDto = {
  skills: UserSkillDto[];
  totalDocs: number;
};
