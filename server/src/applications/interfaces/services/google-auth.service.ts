import { IGoogleAuthDto } from '../../dtos/login.dto';

export interface IGoogleAuthServices {
  getUserInfo(token: string): Promise<IGoogleAuthDto>;
}
