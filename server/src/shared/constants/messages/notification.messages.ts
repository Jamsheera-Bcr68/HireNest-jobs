import { NotificationType } from '../../../domain/enums/notification-enums';
import { SkillStatus } from '../../../domain/enums/skill.enum';
import {
  ApplicationStatusEnum,
  StatusEnum,
} from '../../../domain/enums/status.enum';

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

  [NotificationType.APPLICATION_STATUS_UPDATED]: (data: {
    status: ApplicationStatusEnum;
    companyName: string;
    jobTitle: string;
  }) =>
    `Your application for ${data.jobTitle} at ${data.companyName} has been ${data.status}.`,

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

  [NotificationType.RESCHEDULE_REQUESTED]: (data: {
    candidateName: string;
    jobTitle: string;

    requestedTime?: string;
  }) =>
    `${data.candidateName} has requested to reschedule the interview for ${data.jobTitle}
     `,

  [NotificationType.INTERVIEW_STATUS_UPDATED]: (data: {
    title: string;
    status: string;
  }) =>
    `Your Interview for the role ${data.title} is ${data.status} 
     `,

  [NotificationType.INTERVIEW_UPDATED]: (data: { title: string }) =>
    `Your Interview for the role ${data.title} is Updated  `,

  [NotificationType.SKILL_STATUS_UPDATED]: (data: {
    skillName: string;
    status: SkillStatus;
    reason?: string;
  }) => {
    let msg: string;
    if (data.status == SkillStatus.APPROVED) {
      msg = `Your requested skill ${data.skillName} is ${data.status} by the admin`;
    } else
      msg = `Your requested skill ${data.skillName} is ${data.status} by the admin for the reason ${data.reason}`;

    return msg;
  },
};
