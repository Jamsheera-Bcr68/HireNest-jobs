import {
  CandidateStatus,
  UserFilter,
} from '../../applications/dtos/candidate.dto';
import { UserDistributionChartData } from '../../applications/types/admin-dashboard.types';
import {
  CandidateFilterType,
  PaginatedCandidates,
  PaginatedEntities,
} from '../../applications/types/candidate.type';
import { User } from '../entities/user.entity';
import { UserRole } from '../enums/user.enums';
import { IExperience, IResume } from '../values/profile-types';
import { IBaseRepository } from './base-repository.interface';


export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string, userId?: string): Promise<User | null>

  createUser(user: User): Promise<User>;

  verifyUser(email: string): Promise<void>;

  updateResetToken(
    userId: string,
    hashedToken: string,
    resetTokenExpiry: Date
  ): Promise<void>;

  updatePassword(id: string, password: string): Promise<void>;

  clearResetToken(id: string): Promise<void>;

  addProfileData(userId: string, data: Partial<User>): Promise<User | null>;

  addProfileImage(userId: string, imageUrl: string): Promise<User | null>;

  updateGoogleId(email: string, googleId: string): Promise<User | null>;

  addSkill(id: string, skillId: string): Promise<User | null>;

  removeSkill(userId: string, skillId: string): Promise<User | null>;

  addExperience(userId: string, experienceId: string): Promise<User | null>;

  removeExperience(userId: string, expId: string): Promise<User | null>;

  addEducation(userId: string, eduId: string): Promise<User | null>;

  removeEducation(userId: string, eduId: string): Promise<User | null>;

  addResume(data: IResume, userId: string): Promise<IResume | null>;

  removeProfileImage(userId: string): Promise<User | null>;

  removeResume(userId: string, resumeId: string): Promise<User | null>;

  getCandidateStatus(): Promise<CandidateStatus>;

  getCandidateList(
    filter: Partial<User>,
    page: number,
    limit: number,
    search: string,
    education: string
  ): Promise<PaginatedEntities<User>>;

  removeSavedJob(userId: string, jobId: string): Promise<User | null>;

  saveJob(userId: string, jobId: string): Promise<User | null>;

  getCountBySkill(skillId: string, role: UserRole): Promise<number>;
  getCountByFilter(data: UserFilter): Promise<number>;
  getUserDistributionData():Promise<{_id:UserRole,count:number}[]>
}
