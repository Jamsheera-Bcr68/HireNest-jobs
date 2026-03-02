import { Request, Response, NextFunction } from 'express';
import {
  registerSchema,
  otpSchema,
  resendOtpSchema,
} from '../../validators/registerValidation';

import { ZodError } from 'zod';
import { AppError } from '../../../../domain/errors/AppError';
export const registerValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = registerSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.issues.map((err) => err.message).join('');
      next(new AppError(message, 400));
    } else {
      next(error);
    }
  }
};
export const otpValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    otpSchema.parse(req.body);

    next();
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      const message = error.issues.map((err) => err.message).join('');
      next(new AppError(message, 400));
    } else next(error);
  }
};
export const resendOtpValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('from resend otp validator');

    console.log(req.body);
    resendOtpSchema.parse(req.body);

    next();
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      const message = error.issues.map((err) => err.message).join('');
      next(new AppError(message, 400));
    } else next(error);
  }
};
