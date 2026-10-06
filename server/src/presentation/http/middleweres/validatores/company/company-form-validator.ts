import { Request, Response, NextFunction } from 'express';
import { companyRegisterSchema } from '../../../validators/company/register-validation';
import { companyProfileEditSchema } from '../../../validators/company/company-profile-edit-validation';
import { updateCompanyFieldSchema } from '../../../validators/company/company-update-fields-validation';

export const companyRegisterValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    companyRegisterSchema.safeParse(req.body);
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
    companyProfileEditSchema.safeParse(req.body);
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
    updateCompanyFieldSchema.safeParse(req.body);
    next();
  } catch (error: any) {
    next(error);
  }
};
