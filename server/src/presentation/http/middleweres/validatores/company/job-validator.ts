import { Request, Response, NextFunction } from 'express';
import { jobPostSchema } from '../../../validators/company/job-validation';


export const jobValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   jobPostSchema.safeParse(req.body);
    next();
  } catch (error: any) {
    next(error);
  }
};
export const reportJobValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    jobPostSchema.safeParse(req.body);
    next();
  } catch (error: any) {
    next(error);
  }
};
