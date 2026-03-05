import { Request, Response, NextFunction } from 'express';
import { IGoogleLoginUsecase } from '../../../../applications/interfaces/auth/IgoogleLoginUsecase';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { authMessages } from '../../../../shared/constants/messages/authMesages';
import { UserMapper } from '../../../../applications/mappers/userMapper';

export class GoogleLoginController {
  private _googleLoginUsecase: IGoogleLoginUsecase;
  constructor(googleLoginUsecase: IGoogleLoginUsecase) {
    this._googleLoginUsecase = googleLoginUsecase;
  }
  handle = async (req: Request, res: Response, next: NextFunction) => {
    const { token, role } = req.body;
    console.log('from google login controller, token and role is ', token);
    try {
      const { user, accessToken, refreshToken } =
        await this._googleLoginUsecase.execute(token, role);
      const userDto = UserMapper.toDto(user);

      res.cookie('refreshToken', refreshToken, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(statusCodes.OK).json({
        success: true,
        message: authMessages.success.LOGIN_SUCCESS,
        data: { user: userDto, accessToken },
      });
    } catch (error) {
      next(error);
    }
  };
}
