import { UserRole } from '../../domain/enums/userEnums';
import jwt from 'jsonwebtoken';
import { type TokenPayload } from '../../applications/interfaces/services/ITokenService';
import { authMessages } from '../../shared/constants/messages/authMesages';

export const getToken = (userId: string, email: string, role: UserRole) => {
  const jwt_secret = process.env.JWT_ACCESS_SECRET;
  if (!jwt_secret) throw new Error(authMessages.error.ACCESS_SECRET_NOT_FOUND);
  return jwt.sign({ userId, email, role }, jwt_secret, { expiresIn: '15m' });
};
export const getRefreshToken = (
  userId: string,
  email: string,
  role: UserRole
) => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  if (!refreshSecret)
    throw new Error(authMessages.error.REFRESH_SECRET_NOT_FOUND);
  return jwt.sign({ userId, email, role }, refreshSecret, { expiresIn: '7d' });
};
export const verifyRefreshToken = (token: string): TokenPayload => {
  const refresh_secret = process.env.JWT_REFRESH_SECRET;
  if (!refresh_secret)
    throw new Error(authMessages.error.REFRESH_SECRET_NOT_FOUND);
  const payload = jwt.verify(token, refresh_secret) as {
    userId: string;
    email: string;
    role: UserRole;
  };
  return payload;
};
export const verifyAccessToken = (token: string): TokenPayload => {
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  if (!accessSecret)
    throw new Error(authMessages.error.ACCESS_SECRET_NOT_FOUND);
  const payload = jwt.verify(token, accessSecret) as TokenPayload;
  return payload;
};
