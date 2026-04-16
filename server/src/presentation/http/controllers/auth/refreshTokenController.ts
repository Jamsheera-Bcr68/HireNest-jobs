import { Request, Response } from 'express';
import { AppError } from '../../../../domain/errors/AppError';
import { authMessages } from '../../../../shared/constants/messages/authMesages';

import { statusCodes } from '../../../../shared/enums/statusCodes';
import { ITokenService } from '../../../../applications/interfaces/services/ITokenService';
import { asyncHandler } from '../../middleweres/async-handler';

export class RefreshTokenController {
  private _tokenService: ITokenService;

  constructor(tokenService: ITokenService) {
    this._tokenService = tokenService;
  }

  handle = asyncHandler((req: Request, res: Response) => {
    console.log('refresh-token endpoint hit');

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      console.log('refresh token not found');
      throw new AppError(
        authMessages.error.REFRESH_TOKEN_REQUIRED,
        statusCodes.BADREQUEST
      );
    }
    console.log('refresh token found');

    //  verify token
    const payload = this._tokenService.verifyRefreshToken(refreshToken);
    console.log('verified payload', payload);

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
  });
}
