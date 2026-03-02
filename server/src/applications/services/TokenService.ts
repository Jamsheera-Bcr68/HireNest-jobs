import {
  ITokenService,
  TokenPayload,
} from '../interfaces/services/ITokenService';
import {
  getToken,
  getRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} from '../../infrastructure/services/tokenService';
import { UserRole } from '../../domain/enums/userEnums';

export class TokenService implements ITokenService {
  generateAccessToken(userId: string, email: string, role: UserRole): string {
    const token = getToken(userId, email, role);
    //  console.log('token from token service ', token);

    return token;
  }
  generateRefreshToken(userId: string, email: string, role: UserRole): string {
    const token = getRefreshToken(userId, email, role);
    return token;
  }
  verifyRefreshToken(token: string): {
    userId: string;
    email: string;
    role: UserRole;
  } {
    // console.log('from token servise verify token');
    const payload = verifyRefreshToken(token);
    // console.log('from token servise verify token payload is ', payload);
    return payload;
  }
  verifyAccessToken(token: string): TokenPayload {
    const payload = verifyAccessToken(token);
    return payload;
  }
}
