import { UserRole } from '../../../domain/enums/user.enums';
import { AdminLoginOutPutDto, AdminloginInput } from '../../dtos/admin.dto';
export interface IAdminLoginUsecase {
  execute(input: AdminloginInput, role: UserRole): Promise<AdminLoginOutPutDto>;
}
