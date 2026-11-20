import multer from 'multer';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';

export const fileSize = 5;

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

const audioFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = [
    'audio/webm',
    'audio/webm;codecs=opus',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Invalid audio file type',
        statusCodes.BADREQUEST
      ),
      false
    );
  }
};

export const audioUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: audioFilter,
});

export const fileUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: fileSize * 1020 * 1024 },
  fileFilter: documentFilter,
});
