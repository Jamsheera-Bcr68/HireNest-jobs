import { Request, Response, NextFunction } from 'express';
import { changePasswordSchema } from '../../validators/changePasswordValidation';
import { ZodError } from 'zod';
import { AppError } from '../../../../domain/errors/AppError';

export const changePasswordValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('from validator ', req.body);
    changePasswordSchema.parse(req.body);

    next();
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      const message = error.issues.map((err) => err.message).join('');
      next(new AppError(message, 400));
    } else next(error);
  }
};
