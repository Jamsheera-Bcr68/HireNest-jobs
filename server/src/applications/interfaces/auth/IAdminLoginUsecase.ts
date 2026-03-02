import { AdminLoginOutPutDto, AdminloginInput } from '../../Dtos/adminDto';
export interface IAdminLoginUsecase {
  execute(input: AdminloginInput): Promise<AdminLoginOutPutDto>;
}
