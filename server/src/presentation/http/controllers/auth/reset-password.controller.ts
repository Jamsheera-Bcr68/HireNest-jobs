import { Request, Response } from 'express';
import { IResetPasswordUsecase } from '../../../../applications/interfaces/auth/reset-password.usecase';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { authMessages } from '../../../../shared/constants/messages/auth.mesages';
import { asyncHandler } from '../../middleweres/async-handler';

export class ResetPasswordController {
  private _resetPasswordUsecase: IResetPasswordUsecase;

  constructor(resetPasswordUsecase: IResetPasswordUsecase) {
    this._resetPasswordUsecase = resetPasswordUsecase;
  }

  handle = asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body;

    await this._resetPasswordUsecase.execute(
      payload.email,
      payload.password,
      payload.resetToken
    );
    return res
      .status(statusCodes.OK)
      .json({ success: true, message: authMessages.success.PASSWORD_RESET });
  });
}
