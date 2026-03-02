import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../../../domain/errors/AppError';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { ZodError } from 'zod';
import { statusCodes } from '../../../shared/enums/statusCodes';

//import { authMessages } from "../../../shared/constants/messages/authMesages";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log('from error handler');
  console.log(error);

  if (error instanceof AppError) {
    res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
    return;
  } else if (error instanceof ZodError) {
    let message = error.issues.map((err) => err.message)[0];

    res
      .status(statusCodes.BADREQUEST)
      .json({ success: false, message: message });
    return;
  }
  const statusCode = 500;
  const message = generalMessages.errors.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({ success: false, message: message });
};
