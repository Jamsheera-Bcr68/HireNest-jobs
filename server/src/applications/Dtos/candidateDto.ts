import { UserRole } from '../../domain/enums/userEnums';

import { IAddress, ISocialMediaLinks } from '../../domain/values/profileTypes';

export interface CandidateProfileUpdateDto {
  email: string;
  userId: string;
  role: UserRole;
  name?: string;
  title?: string;
  location?: IAddress;
  socialMedidaLinks?: ISocialMediaLinks;
}
