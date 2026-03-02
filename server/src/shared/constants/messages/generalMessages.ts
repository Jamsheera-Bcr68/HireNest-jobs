import { success } from 'zod';

export const generalMessages = {
  success: {},
  errors: {
    INTERNAL_SERVER_ERROR: 'Something went wrong, please try again later',
    INVALID_RESUME_FILE_TYPE: 'Only docx and pdf formats are allowed',
    INVALID_IMAGES_FILE_TYPE: 'Only png and jpeg formats are allowed',
    RESUME_NOTFOUND: 'Resume not found',
  },
};
