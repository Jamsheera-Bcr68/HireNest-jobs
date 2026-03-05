import { Request, Response, NextFunction } from 'express';
import { jobPostSchema } from '../../../validators/company/jobValidation';

export const jobValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = jobPostSchema.safeParse(req.body);
    next();
  } catch (error: any) {
    next(error);
  }
};
