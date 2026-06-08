import { NotificationType } from '../../../domain/enums/notification-enums';
import { StatusEnum } from '../../../domain/enums/status.enum';

export const notificationMessages = {
  [NotificationType.INTERVIEW_SCHEDULED]: (data: {
    companyName: string;
    jobTitle: string;
    interviewDate: string;
    interviewTime: string;
  }) =>
    `Your interview for ${data.jobTitle} at ${data.companyName} is scheduled on ${data.interviewDate} at ${data.interviewTime}.`,

  [NotificationType.INTERVIEW_RESCHEDULED]: (data: {
    companyName: string;
    jobTitle: string;
    newInterviewDate: string;
    newInterviewTime: string;
  }) =>
    `Your interview for ${data.jobTitle} at ${data.companyName} has been rescheduled to ${data.newInterviewDate} at ${data.newInterviewTime}.`,

  [NotificationType.INTERVIEW_CANCELLED]: (data: {
    companyName: string;
    jobTitle: string;
  }) =>
    `Your interview for ${data.jobTitle} at ${data.companyName} has been cancelled.`,

  [NotificationType.APPLICATION_APPROVED]: (data: {
    companyName: string;
    jobTitle: string;
  }) =>
    `Your application for ${data.jobTitle} at ${data.companyName} has been approved.`,

  [NotificationType.APPLICATION_REJECTED]: (data: {
    companyNme: string;
    jobTitle: string;
  }) =>
    `Application   for ${data.jobTitle} to ${data.companyNme} has been Rejected.`,

  [NotificationType.INTERVIEW_CONFIRMED]: (data: {
    name: string;
    jobTitle: string;
  }) =>
    `Your interview for ${data.jobTitle}
has been confirmed by ${data.name}.`,
  [NotificationType.SKILL_APPROVAL_REQUEST]: (data: { skillName: string }) =>
    `A new skill "${data.skillName}" is awaiting approval.`,

  [NotificationType.JOB_APPLIED]: (data: { jobTitle: string }) =>
    `A new application recieved for the position of ${data.jobTitle}.`,

  [NotificationType.APPLICATION_SHORTLISTED]: (data: {
    companyName: string;
    jobTitle: string;
  }) =>
    `Your application for ${data.jobTitle} at ${data.companyName} has been shortlisted.`,

  [NotificationType.COMPANY_REVIEW_COMPLETED]: (data: {
    status: StatusEnum;
    reason?: string;
  }) => {
    if (data.status == 'suspended' && data.reason) {
      return `Your company  account is ${data.status} by admin for the reason ${data.reason}`;
    }

    if (data.status == 'rejected' && data.reason) {
      return `Your company  account is rejected by admin for the reason ${data.reason}`;
    } else
      return 'Your account id verified and approved by the admin now you are able to post jobs';
  },

  [NotificationType.COMPANY_REAPPLY_RECIEVED]: (data: {
    companyName: string;
  }) => `Company ${data.companyName} reapplied`,
};
