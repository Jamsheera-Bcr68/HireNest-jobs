import { IGoogleAuthDto } from '../../Dtos/loginDto';

export interface IGoogleAuthServices {
  getUserInfo(token: string): Promise<IGoogleAuthDto>;
}
