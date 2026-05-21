import multer from 'multer';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { AppError } from '../../../domain/errors/app-error';
import { statusCodes } from '../../../shared/enums/statuscodes';
const storage = multer.memoryStorage();
// const fileFilter = (req: any, file: any, cb: any) => {
//   const allowedTypes = ['image/jpeg', 'image/png','image/jpg'];
//   if (allowedTypes.includes(file.mimeType)) {
//     cb(null, true);
//   } else {

//     throw new AppError(generalMessages.errors.INVALID_IMAGES_FILE_TYPE,statusCodes.BADREQUEST);
//   }
// };
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  // fileFilter,
});
