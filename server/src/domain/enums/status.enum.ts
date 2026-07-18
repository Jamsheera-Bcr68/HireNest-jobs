export enum StatusEnum {
  ACTIVE = 'active',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  BLOCKED = 'bloked',
  REMOVED = 'removed',
  EXPIRED = 'expired',
  REJECTED = 'rejected',
  PAUSED = 'paused',
  CLOSED = 'closed',
}
export enum ApplicationStatusEnum {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  SHORT_LISTED = 'shortListed',
  REJECTED = 'rejected',
  INTERVIEW_SCHEDULED = 'interviewScheduled',
  INTERVIEW_COMPLETED = 'interviewCompleted',
  OFFERED = 'offered',
  HIRED='hired',
  WITHDRAWN = 'withdrawn',
}
export enum InterviewStatusEnum {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'not-show',
}
