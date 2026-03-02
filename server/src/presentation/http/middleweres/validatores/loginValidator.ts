import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  googeLoginSchema,
} from '../../validators/loginValidation';
import { Request, Response, NextFunction } from 'express';
export const loginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    next(result.error);
  } else next();
};

export const forgotPasswordValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = forgotPasswordSchema.safeParse(req.body);
  if (!result.success) {
    next(result.error);
  } else next();
};
export const resetPasswordValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = resetPasswordSchema.safeParse(req.body);
  console.log('result from  resetvalidator', result);
  if (!result.success) {
    next(result.error);
  } else next();
};

export const googeLoginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = googeLoginSchema.safeParse(req.body);
  if (!result.success) {
    next(result.error);
  } else next();
};

export const changePasswordValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
