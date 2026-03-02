import { Request, Response, NextFunction } from 'express';
import { companyRegisterSchema } from '../../../validators/company/registerValidation';

export const companyRegisterValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = companyRegisterSchema.safeParse(req.body);
    next();
  } catch (error: any) {
    next(error);
  }
};
