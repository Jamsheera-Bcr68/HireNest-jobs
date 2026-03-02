import { Request, Response, NextFunction } from 'express';
import {
  profileDataSchema,
  ExperienceSchema,
} from '../../validators/profileValidation';

export const profileValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    profileDataSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
export const experienceFormValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    ExperienceSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
