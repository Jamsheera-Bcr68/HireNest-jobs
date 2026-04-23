import { success } from 'zod';

export const generalMessages = {
  success: {
    RESUME_EXISTANCE_IDENTIFIED: 'Resume existance checked',
    STATUS_FETCHED: (entity: string) => `${entity} Status fetched Successfully`,
    ENTITY_CREATED: (entity: string,action:string) => `${entity} ${action} Successfully`,
    STATUS_UPDATED: (entity: string,status:string) => `${entity} Status ${status} Successfully`,
    RESUME_DELETED: 'Resume deleted',
    ENTITY_DETAILS_FETCHED: (item: string) =>
      `${item} Details Fetched SuccessFully`,
  },
  errors: {
    NOT_FOUND: (entity: string) => `${entity} not found`,
    INTERNAL_SERVER_ERROR: 'Something went wrong, please try again later',
    INVALID_RESUME_FILE_TYPE: 'Only docx and pdf formats are allowed',
    INVALID_IMAGES_FILE_TYPE: 'Only png and jpeg formats are allowed',
    RESUME_NOTFOUND: 'Resume not found',
    URL_NOTFOUND: 'Resume url not found',
    ID_NOT_FOUND: (item: string) => `${item} id not found`,
  },
};
