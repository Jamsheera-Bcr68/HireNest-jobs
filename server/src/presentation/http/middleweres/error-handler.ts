import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { success, ZodError } from 'zod';
import { statusCodes } from '../../../shared/enums/statuscodes';
import multer from 'multer';
import { fileSize } from './pdf-upload';

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
  } else if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      res
        .status(statusCodes.BADREQUEST)
        .json({
          success: false,
          message: generalMessages.errors.SIZE_LIMIT_EXEED(fileSize),
        });
      return;
    }
  }
  const statusCode = 500;
  const message = generalMessages.errors.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({ success: false, message: message });
};
