import { UserRole } from '../../../domain/enums/userEnums';
import { loginOutPutDto } from '../../Dtos/loginDto';

export interface IGoogleLoginUsecase {
  execute(token: string, role: UserRole): Promise<loginOutPutDto>;
}
