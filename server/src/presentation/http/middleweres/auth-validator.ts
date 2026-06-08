import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../domain/errors/app-error';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import {
  ITokenService,
  TokenPayload,
} from '../../../applications/interfaces/services/token.service';
import { TokenExpiredError } from 'jsonwebtoken';

//import '../../../types/express/index'

export function authValidator(tokenService: ITokenService) {
  //console.log('from auth validator ');
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
   // console.log('from auth validator authHeader is ', authHeader);

    if (!authHeader)
      return next(
        new AppError(authMessages.error.UNAUTHORIZED, statusCodes.UNAUTHERIZED)
      );
    const token = authHeader.split(' ')[1];
   

    if (!token)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    try {
       console.log('token is ', token);

      const user: TokenPayload = tokenService.verifyAccessToken(token);
      // console.log('user from validator', user);

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return next(
          new AppError(
            authMessages.error.ACCESSTOKEN_EXPIRED,
            statusCodes.UNAUTHERIZED
          )
        );
      } else
        next(
          new AppError(
            authMessages.error.UNAUTHORIZED,
            statusCodes.UNAUTHERIZED
          )
        );
    }
  };
}
