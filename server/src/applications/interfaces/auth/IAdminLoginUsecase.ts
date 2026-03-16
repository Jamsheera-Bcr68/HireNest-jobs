import { UserRole } from '../../../domain/enums/userEnums';
import { AdminLoginOutPutDto, AdminloginInput } from '../../Dtos/adminDto';
export interface IAdminLoginUsecase {
  execute(input: AdminloginInput,role:UserRole): Promise<AdminLoginOutPutDto>;
}
