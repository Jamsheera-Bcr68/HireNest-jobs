import { Request, Response, NextFunction } from 'express';
import { IResetPasswordUsecase } from '../../../../applications/interfaces/auth/IResetPasswordUsecase';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { authMessages } from '../../../../shared/constants/messages/authMesages';

export class ResetPasswordController {
  private _resetPasswordUsecase: IResetPasswordUsecase;
  constructor(resetPasswordUsecase: IResetPasswordUsecase) {
    this._resetPasswordUsecase = resetPasswordUsecase;
  }
  handle = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    try {
      await this._resetPasswordUsecase.execute(
        payload.email,
        payload.password,
        payload.resetToken
      );
      return res
        .status(statusCodes.OK)
        .json({ success: true, message: authMessages.success.PASSWORD_RESET });
    } catch (error) {
      next(error);
    }
  };
}
