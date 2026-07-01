import { success } from 'zod';

export const generalMessages = {
  success: {
    RESUME_EXISTANCE_IDENTIFIED: 'Resume existance checked',
    STATUS_FETCHED: (entity: string) => `${entity} Status fetched Successfully`,
    ENTITY_CREATED: (entity: string, action: string) =>
      `${entity} ${action} Successfully`,
    STATUS_UPDATED: (entity: string, status: string) =>
      `${entity} Status ${status} Successfully`,
    RESUME_DELETED: 'Resume deleted',
    ENTITY_DETAILS_FETCHED: (item: string) =>
      `${item} Details Fetched SuccessFully`,
    RESULT_UPDATED: (item: string) => `${item} result updated`,
    ENTITY_UPDATED: (item: string, action: string) =>
      `${item} ${action} Successfully`,
    NEW_NOTIFICATION_COUNT_FETCHED:
      'New Notification count fetched Successfully',
    NEW_MESSAGES_COUNT_FETCHED:
      'New messages count fetched Successfully',
      ENTITIES_FETCHED:(item:string)=>`${item} Fetched Successfully`,
      MARK_AS_READ:'Notification marked as read',
      NOTIFICATION_DELETED:'Notification deleted successfully',
      COMPANY_REAPPLICATION_SUBMITTED:'Company Reapplication Submitted Successfully'
  },
  errors: {
    NOT_FOUND: (entity: string) => `${entity} not found`,
    INTERNAL_SERVER_ERROR: 'Something went wrong, please try again later',
    INVALID_RESUME_FILE_TYPE: 'Only docx and pdf formats are allowed',
    INVALID_IMAGES_FILE_TYPE: 'Only png and jpeg formats are allowed',
    RESUME_NOTFOUND: 'Resume not found',
    URL_NOTFOUND: 'Resume url not found',
    ID_NOT_FOUND: (item: string) => `${item} id not found`,
    INTERVIEW_NOT_SCHEDULED: 'This interview is not scheduled ',
    ALREADY_REQUESTED_RESCHEDULE: 'Allready Requested for Reschedule',
    ALREADY_CONFIRMED: 'This interview is already confirmed',
   COMPANY_ALREADY_EXIST:(field:string)=>`Company with same ${field} is already exist`,
   REAPPLY_COUNT_LIMIT_EXEEDED:'You can only reapply for 3 times',
   FORBIDDEN:`You are not authorized to access this resource.`
  },
};
