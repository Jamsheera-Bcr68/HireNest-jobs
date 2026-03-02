//import { AppError } from "../../../domain/errors/AppError";
import { ILogoutUsecase } from '../../interfaces/auth/ILogoutUsecase';
import { Request, Response } from 'express-serve-static-core';

export class LogoutUsecase implements ILogoutUsecase {
  constructor() {}
  async execute(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies.refreshToken;
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    console.log(refreshToken);
  }
}
