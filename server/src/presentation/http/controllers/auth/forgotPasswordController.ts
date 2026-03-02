import { Request, Response, NextFunction } from 'express';
import { IForgotPasswordUsecase } from '../../../../applications/interfaces/auth/IForgotPasswordUsecase';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { authMessages } from '../../../../shared/constants/messages/authMesages';
export class ForgotPassWordController {
  private _forgotPasswordUsecase: IForgotPasswordUsecase;
  constructor(forgotPasswordUsecase: IForgotPasswordUsecase) {
    this._forgotPasswordUsecase = forgotPasswordUsecase;
  }
  handle = async (req: Request, res: Response, next: NextFunction) => {
    console.log('form forgot password controller');
    const { email } = req.body;
    try {
      console.log('email is ', email);
      await this._forgotPasswordUsecase.execute(email);
      return res.status(statusCodes.OK).json({
        success: true,
        message: authMessages.success.PASSWORD_RESET_LINK_SEND,
      });
    } catch (error) {
      next(error);
    }
  };
}
