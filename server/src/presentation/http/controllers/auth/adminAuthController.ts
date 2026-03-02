import { NextFunction, Request, Response } from 'express';
import { IAdminLoginUsecase } from '../../../../applications/interfaces/auth/IAdminLoginUsecase';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { authMessages } from '../../../../shared/constants/messages/authMesages';
import { AdminMapper } from '../../../../applications/mappers/adminMapper';
import { AdminloginInput } from '../../../../applications/Dtos/adminDto';

export class AdminAuthController {
  private _loginUsecase: IAdminLoginUsecase;
  constructor(adminLoginUsecase: IAdminLoginUsecase) {
    this._loginUsecase = adminLoginUsecase;
  }
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: AdminloginInput = req.body;
      console.log('from admin controller');

      const { admin, refreshToken, accessToken } =
        await this._loginUsecase.execute(payload);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const adminDto = AdminMapper.toDto(admin);
      return res.status(statusCodes.OK).json({
        success: true,
        message: authMessages.success.LOGIN_SUCCESS,
        data: { adminDto, accessToken },
      });
    } catch (error) {
      next(error);
    }
  };
}
