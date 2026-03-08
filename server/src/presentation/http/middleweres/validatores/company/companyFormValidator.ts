import { Request, Response, NextFunction } from 'express';
import { companyRegisterSchema } from '../../../validators/company/registerValidation';
import { companyProfileEditSchema } from '../../../validators/company/companyProfileEditValidation';
import { updateCompanyFieldSchema } from '../../../validators/company/companyUpdateFieldsValidation';

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
export const companyProfileEditValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = companyProfileEditSchema.safeParse(req.body);
    next();
  } catch (error: any) {
    next(error);
  }
};
export const companyProfileUpdateFieldsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = updateCompanyFieldSchema.safeParse(req.body);
    next();
  } catch (error: any) {
    next(error);
  }
};
