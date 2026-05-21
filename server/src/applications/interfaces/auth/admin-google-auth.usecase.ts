import { UserRole } from '../../../domain/enums/user.enums';

import { AdminLoginOutPutDto } from '../../dtos/admin.dto';
export interface IAdminGoogleAuthUsecase {
  execute(token: string, role: UserRole): Promise<AdminLoginOutPutDto>;
}
