import { Request, Response } from 'express';
import { IForgotPasswordUsecase } from '../../../../applications/interfaces/auth/forgot-password.usecase';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { authMessages } from '../../../../shared/constants/messages/auth.mesages';
import { asyncHandler } from '../../middleweres/async-handler';

export class ForgotPassWordController {
  private _forgotPasswordUsecase: IForgotPasswordUsecase;

  constructor(forgotPasswordUsecase: IForgotPasswordUsecase) {
    this._forgotPasswordUsecase = forgotPasswordUsecase;
  }

  handle = asyncHandler(async (req: Request, res: Response) => {
   
    const { email, role } = req.body;


    await this._forgotPasswordUsecase.execute(email, role);
    return res.status(statusCodes.OK).json({
      success: true,
      message: authMessages.success.PASSWORD_RESET_LINK_SEND,
    });
  });
}
