import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../../domain/errors/app-error';
import { authMessages } from '../../../../shared/constants/messages/auth.mesages';

import { statusCodes } from '../../../../shared/enums/statuscodes';
import { ITokenService } from '../../../../applications/interfaces/services/token.service';
import { asyncHandler } from '../../middleweres/async-handler';

export class RefreshTokenController {
  private _tokenService: ITokenService;

  constructor(tokenService: ITokenService) {
    this._tokenService = tokenService;
  }

  handle = asyncHandler((req: Request, res: Response, next: NextFunction) => {
    //  console.log('refresh-token endpoint hit');
    try {
      const refreshToken = req.cookies.refreshToken;
      console.log('refreshtoken from refresh controller',refreshToken);
      
      if (!refreshToken) {
        console.log('refresh token not found,cookies', req.cookies);
        throw new AppError(
          authMessages.error.REFRESH_TOKEN_REQUIRED,
          statusCodes.BADREQUEST
        );
        return
      }

       console.log('refresh token found',refreshToken);

      //  verify token
      const payload = this._tokenService.verifyRefreshToken(refreshToken);
      // console.log('verified payload', payload);

      const newToken = this._tokenService.generateAccessToken(
        payload.userId,
        payload.email,
        payload.role
      );
      return res.status(statusCodes.OK).json({
        success: true,
        accessToken: newToken,
        message: authMessages.success.REFRESH_TOKEN_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  });
}
