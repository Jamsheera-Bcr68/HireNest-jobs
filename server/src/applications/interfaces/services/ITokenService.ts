import { UserRole } from '../../../domain/enums/userEnums';

export type TokenPayload = {
  userId: string;
  email: string;
  role: UserRole;
};

export interface ITokenService {
  generateAccessToken(userId: string, email: string, role: UserRole): string;
  generateRefreshToken(userId: string, email: string, role: UserRole): string;
  verifyRefreshToken(token: string): TokenPayload;
  verifyAccessToken(token: string): TokenPayload;
}
