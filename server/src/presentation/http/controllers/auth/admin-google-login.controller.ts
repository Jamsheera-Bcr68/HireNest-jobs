import { Request, Response } from 'express';
import { authMessages } from '../../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { IAdminGoogleAuthUsecase } from '../../../../applications/interfaces/auth/admin-google-auth.usecase';
import { AdminMapper } from '../../../../applications/mappers/admin.mapper';
import { asyncHandler } from '../../middleweres/async-handler';

export class AdminGoogleAuthController {
  private _adminGoogleAuthUsecase: IAdminGoogleAuthUsecase;

  constructor(adminGoogleAuthUsecase: IAdminGoogleAuthUsecase) {
    this._adminGoogleAuthUsecase = adminGoogleAuthUsecase;
  }

  handle = asyncHandler(async (req: Request, res: Response) => {
    const { token, role } = req.body;

   // console.log('token, role', token, role);

    const { admin, refreshToken, accessToken } =
      await this._adminGoogleAuthUsecase.execute(token, role);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth/refresh-token',
    });
    const adminDto = AdminMapper.toDto(admin);
    return res.status(statusCodes.OK).json({
      success: true,
      message: authMessages.success.LOGIN_SUCCESS,
      data: { admin: adminDto, accessToken },
    });
  });
}
