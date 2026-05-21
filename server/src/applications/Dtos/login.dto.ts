import { User } from '../../domain/entities/user.entity';

export interface loginOutPutDto {
  user: User;
  accessToken: string;
  refreshToken: string;
  companyId?: string;
  isProfileCompleted?: boolean;
  appliedJobs?: string[];
}

export interface IloginInput {
  email: string;
  password: string;
}
export interface IGoogleAuthDto {
  isVerified: boolean;
  googleId: string;
  email: string;
  name: string;
}
