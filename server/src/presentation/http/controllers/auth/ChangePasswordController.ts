import { Request, Response } from 'express';
import { changePasswordInputDto } from '../../../../applications/Dtos/changePasswordInputDto';
import { AppError } from '../../../../domain/errors/AppError';
import { authMessages } from '../../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { IChangePasswordUsecase } from '../../../../applications/interfaces/auth/IChangePasswordUsecase';
import { asyncHandler } from '../../middleweres/async-handler';

export class ChangePasswordController {
  private _changePasswordUsecase: IChangePasswordUsecase;
  constructor(changePasswordUsecase: IChangePasswordUsecase) {
    this._changePasswordUsecase = changePasswordUsecase;
  }
  changePassword = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }
    const { userId, email } = req.user;
    console.log('userId,email', userId, email);
    const payload: changePasswordInputDto = req.body;

    await this._changePasswordUsecase.execute(
      userId,
      email,
      payload.password,
      payload.current_password
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: authMessages.success.PASSWORD_CHANGE_SUCCESS,
    });
  });
}
