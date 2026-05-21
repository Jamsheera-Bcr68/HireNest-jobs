import { UserRole } from '../../../domain/enums/user.enums';
import { loginOutPutDto } from '../../dtos/login.dto';

export interface IGoogleLoginUsecase {
  execute(token: string, role: UserRole): Promise<loginOutPutDto>;
}
