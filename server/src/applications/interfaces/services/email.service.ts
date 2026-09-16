export interface IEmailService {
  sendOtp(email: string, otp: string): void;
  sendResetPasswordLink(email: string, resetLink: string): Promise<void>;
  sendCompanyRejectionMail(
    email: string,
    name: string,
    companyName: string,
    reapplyCount: number,
    rejectionReason: string
  ): Promise<void>;
  sendCompanyApprovalMail(
    email: string,
    name: string,
    companyName: string
  ): Promise<void>;
  sendInterviewScheduledEmail( email:string, name: string,
  jobTitle: string,
  companyName: string,
  interviewDate: string,
  interviewTime: string,
  interviewType: 'online' | 'offline',
  meetLink?: string,
  location?: string):Promise<void>
}
