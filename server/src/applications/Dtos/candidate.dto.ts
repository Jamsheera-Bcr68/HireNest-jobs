import { UserRole } from '../../domain/enums/user.enums';

import { IAddress, ISocialMediaLinks } from '../../domain/values/profile-types';

export interface CandidateProfileUpdateDto {
  email: string;
  userId: string;
  role: UserRole;
  name?: string;
  title?: string;
  location?: IAddress;
  socialMedidaLinks?: ISocialMediaLinks;
}
export type CandidateStatus = {
  totalCandidate?: number;
  active?: number;

  suspended?: number;
  new: number;
};
