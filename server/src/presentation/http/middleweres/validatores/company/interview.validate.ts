import { Request, Response, NextFunction } from 'express';
import { interviewFormSchema } from '../../../validators/interview.validation';

export const interviewValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = interviewFormSchema.safeParse(req.body);
    next();
  } catch (error: any) {
    next(error);
  }
};
