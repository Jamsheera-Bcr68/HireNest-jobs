import { IRegisterUseCase } from '../../../../applications/interfaces/auth/IUserRegisterUseCase';
import { Request, Response, NextFunction } from 'express';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { authMessages } from '../../../../shared/constants/messages/authMesages';
import { IUserLoginUseCase } from '../../../../applications/interfaces/auth/IUserLoginUseCase';

import { ISendOtpService } from '../../../../applications/interfaces/services/ISendOtpservice';
import { IVerifyOtpService } from '../../../../applications/interfaces/services/IVerifyOtpService';
import { ILogoutUsecase } from '../../../../applications/interfaces/auth/ILogoutUsecase';
import { AppError } from '../../../../domain/errors/AppError';
import { IloginInput } from '../../../../applications/Dtos/loginDto';
import { UserMapper } from '../../../../applications/mappers/userMapper';

export class AuthController {
  private _registerUseCase: IRegisterUseCase;
  private _loginUseCase: IUserLoginUseCase;
  private _sendOtpService: ISendOtpService;
  private _verifyOtpService: IVerifyOtpService;
  private _logoutUsecase: ILogoutUsecase;
  constructor(
    registerUseCase: IRegisterUseCase,
    loginUseCase: IUserLoginUseCase,
    sendOtpServce: ISendOtpService,
    verifyOtpService: IVerifyOtpService,
    logoutUsecase: ILogoutUsecase
  ) {
    this._registerUseCase = registerUseCase;
    this._sendOtpService = sendOtpServce;
    this._loginUseCase = loginUseCase;
    this._verifyOtpService = verifyOtpService;
    this._logoutUsecase = logoutUsecase;
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const pendingUser = await this._registerUseCase.execute(payload);

      const otp_expiry = await this._sendOtpService.execute(pendingUser.email);
      res.status(statusCodes.CREATED).json({
        sucess: true,
        message: authMessages.success.PENDING_SIGNUP,
        otp_expiry: otp_expiry,
      });
    } catch (err) {
      next(err);
    }
  };

  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    console.log('from auth  controller verify otp');

    try {
      await this._verifyOtpService.execute(payload.email, payload.otp);

      return res
        .status(statusCodes.OK)
        .json({ success: true, message: authMessages.success.OTP_VERIFIED });
    } catch (error: any) {
      console.log('error is ', error.message);

      next(new AppError(error.message, 400));
    }
  };
  resendOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    console.log('from auth controller email is ', email);
    try {
      const otp_expiry = await this._sendOtpService.execute(email);

      return res.status(statusCodes.OK).json({
        success: true,
        message: authMessages.success.OTP_RESEND,
        otp_expiry: otp_expiry,
      });
    } catch (error: any) {
      next(error);
    }
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    //  console.log('from login controller');
    try {
      const payload: IloginInput = req.body;
      const { user, refreshToken, accessToken } =
        await this._loginUseCase.execute(payload);
      const userDto = UserMapper.toDto(user);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/auth/refresh-token',
      });

      return res.status(statusCodes.OK).json({
        success: true,
        message: authMessages.success.LOGIN_SUCCESS,
        data: { user: userDto, accessToken },
      });
    } catch (err) {
      next(err);
    }
  };
  logout = async (req: Request, res: Response, next: NextFunction) => {
    console.log('from logout controller');
    try {
      this._logoutUsecase.execute(req, res);
      return res
        .status(statusCodes.OK)
        .json({ success: true, message: authMessages.success.LOGOUT_SUCCESS });
    } catch (error) {
      next(error);
    }
  };
}
