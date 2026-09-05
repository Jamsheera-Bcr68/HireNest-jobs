import { Request, Response } from 'express';
import { IAdminLoginUsecase } from '../../../../applications/interfaces/auth/admin-login.usecase';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { authMessages } from '../../../../shared/constants/messages/auth.mesages';
import { AdminMapper } from '../../../../applications/mappers/admin.mapper';
import { AdminloginInput } from '../../../../applications/dtos/admin.dto';
import { UserRole } from '../../../../domain/enums/user.enums';
import { asyncHandler } from '../../middleweres/async-handler';

export class AdminAuthController {
  private _loginUsecase: IAdminLoginUsecase;
  constructor(adminLoginUsecase: IAdminLoginUsecase) {
    this._loginUsecase = adminLoginUsecase;
  }

  login = asyncHandler(async (req: Request, res: Response) => {
    const payload: AdminloginInput = req.body;
   console.log('from admin auth controller,role', req.body.role);

    const { admin, refreshToken, accessToken } =
      await this._loginUsecase.execute(payload, UserRole.ADMIN);
      console.log('refresh token',refreshToken);
      
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/auth/refresh-token',
    });

    console.log('res.cookie',res.getHeader('Set-Cookie'));
    

    const adminDto = AdminMapper.toDto(admin);
    return res.status(statusCodes.OK).json({
      success: true,
      message: authMessages.success.LOGIN_SUCCESS,
      data: { admin: adminDto, accessToken: accessToken },
    });
  });
}
