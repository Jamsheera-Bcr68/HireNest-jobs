import { SkillStatus } from '../../domain/enums/skill.enum';
import { UserRole } from '../../domain/enums/user.enums';
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
export type CandidateSkillDto={
  id:string,
  skillName:string
}
