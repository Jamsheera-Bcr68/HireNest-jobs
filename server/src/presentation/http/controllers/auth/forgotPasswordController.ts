import { Request, Response } from 'express';
import { IForgotPasswordUsecase } from '../../../../applications/interfaces/auth/IForgotPasswordUsecase';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { authMessages } from '../../../../shared/constants/messages/authMesages';
import { asyncHandler } from '../../middleweres/async-handler';

export class ForgotPassWordController {
  private _forgotPasswordUsecase: IForgotPasswordUsecase;

  constructor(forgotPasswordUsecase: IForgotPasswordUsecase) {
    this._forgotPasswordUsecase = forgotPasswordUsecase;
  }

  handle = asyncHandler(async (req: Request, res: Response) => {
    console.log('form forgot password controller');
    const { email, role } = req.body;

    console.log('email is ', email);
    await this._forgotPasswordUsecase.execute(email, role);
    return res.status(statusCodes.OK).json({
      success: true,
      message: authMessages.success.PASSWORD_RESET_LINK_SEND,
    });
  });
}
