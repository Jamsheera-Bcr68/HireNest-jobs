import { Request, Response } from 'express';
import { IGoogleLoginUsecase } from '../../../../applications/interfaces/auth/IgoogleLoginUsecase';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { authMessages } from '../../../../shared/constants/messages/authMesages';
import { UserMapper } from '../../../../applications/mappers/userMapper';
import { asyncHandler } from '../../middleweres/async-handler';

export class GoogleLoginController {
  private _googleLoginUsecase: IGoogleLoginUsecase;

  constructor(googleLoginUsecase: IGoogleLoginUsecase) {
    this._googleLoginUsecase = googleLoginUsecase;
  }

  handle = asyncHandler(async (req: Request, res: Response) => {
    const { token, role } = req.body;
    console.log('from google login controller, token and role is ', token);

    const {
      user,
      accessToken,
      refreshToken,
      companyId,
      isProfileCompleted,
      appliedJobs,
    } = await this._googleLoginUsecase.execute(token, role);
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
      data: {
        user: { ...userDto, companyId, isProfileCompleted, appliedJobs },
        accessToken,
      },
    });
  });
}
