import { ILogoutUsecase } from '../../interfaces/auth/logout.usecase';
import { Request, Response } from 'express-serve-static-core';

export class LogoutUsecase implements ILogoutUsecase {
  constructor() {}
  async execute(req: Request, res: Response): Promise<void> {
    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/auth/refresh-token',
    });
  }
}
