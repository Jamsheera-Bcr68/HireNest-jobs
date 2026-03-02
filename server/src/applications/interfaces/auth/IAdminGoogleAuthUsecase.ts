import { UserRole } from '../../../domain/enums/userEnums';

import { AdminLoginOutPutDto } from '../../Dtos/adminDto';
export interface IAdminGoogleAuthUsecase {
  execute(token: string, role: UserRole): Promise<AdminLoginOutPutDto>;
}
