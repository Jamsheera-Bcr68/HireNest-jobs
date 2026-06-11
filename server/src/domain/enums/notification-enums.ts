import { InterviewStatusEnum } from "./status.enum";

export enum NotificationType {
  INTERVIEW_SCHEDULED = 'Interview Scheduled',
  INTERVIEW_CONFIRMED = 'Interview Confirmed',
  INTERVIEW_RESCHEDULED = 'Interview Rescheduled',
  INTERVIEW_CANCELLED = 'Interview Cancelled',
  APPLICATION_APPROVED = 'Application Approved',
  APPLICATION_REJECTED = 'Application Rejected',
  SKILL_APPROVAL_REQUEST = 'Skill Request Recieved',
  SKILL_STATUS_UPDATED = 'Skill Status updated',
  JOB_APPLIED = 'Job Application Recieved',
  APPLICATION_SHORTLISTED = 'Application Shortlisted',
  COMPANY_APPROVAL_REQUEST = 'Application Recieved',
  COMPANY_REVIEW_COMPLETED = 'Company Registration Review Completed',
  COMPANY_SUSPENDED='Company Suspended',
  COMPANY_REAPPLY_RECIEVED='Company Reapplication Recieved',
  RESCHEDULE_REQUESTED='Reschedule Request Recieved',
  INTERVIEW_STATUS_UPDATED='Interview Status Updated',
  INTERVIEW_UPDATED='Interview  Updated'
}
