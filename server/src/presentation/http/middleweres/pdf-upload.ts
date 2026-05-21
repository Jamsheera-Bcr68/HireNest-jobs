import { NextFunction, Request, Response } from 'express';
import multer, { memoryStorage } from 'multer';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';

const documentFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        generalMessages.errors.INVALID_RESUME_FILE_TYPE,
        statusCodes.BADREQUEST
      ),
      false
    );
  }
};
export const fileUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1020 * 1024 },
  fileFilter: documentFilter,
});
