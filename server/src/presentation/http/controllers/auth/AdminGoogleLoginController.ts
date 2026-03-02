import { NextFunction, Request, Response } from 'express';
import { authMessages } from '../../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { IAdminGoogleAuthUsecase } from '../../../../applications/interfaces/auth/IAdminGoogleAuthUsecase';

export class AdminGoogleAuthController {
  private _adminGoogleAuthUsecase: IAdminGoogleAuthUsecase;
  constructor(adminGoogleAuthUsecase: IAdminGoogleAuthUsecase) {
    this._adminGoogleAuthUsecase = adminGoogleAuthUsecase;
  }
  handle = async (req: Request, res: Response, next: NextFunction) => {
    const { token, role } = req.body;
    try {
      const { admin, refreshToken, accessToken } =
        await this._adminGoogleAuthUsecase.execute(token, role);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(statusCodes.OK).json({
        success: true,
        message: authMessages.success.LOGIN_SUCCESS,
        data: { admin, accessToken },
      });
    } catch (error) {
      next(error);
    }
  };
}
