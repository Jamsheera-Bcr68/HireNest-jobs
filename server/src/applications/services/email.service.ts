import { IEmailService } from '../interfaces/services/email.service';
import { emailTemplate } from '../../shared/email-OTP-template';
import { emailPasswordResetTemplate } from '../../shared/email-reset-link-template';
import { companyApprovalEmailTemplate } from '../../shared/company-approval-email.template';

export class EmailService implements IEmailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendOtp(email: string, otp: string): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"HireNest" <${process.env.ADMIN_EMAIL}>`,
        to: email,
        subject: `Your OTP code`,
        html: emailTemplate(otp, 1),
      });
      console.log(
        '(nodemailer.getTestMessageUrl',
        nodemailer.getTestMessageUrl(info)
      );
    } catch (error) {
      throw new Error('Failed to send Email');
    }
  }

  async sendResetPasswordLink(email: string, resetLink: string): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"HireNest" <${process.env.ADMIN_EMAIL}>`,
        to: email,
        subject: 'Your Pasword resent link ',
        html: emailPasswordResetTemplate(resetLink),
      });
      console.log(nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log(error);

      throw new Error('Failed to send Email');
    }
  }

  async sendCompanyRejectionMail(
    email: string,
    name: string,
    companyName: string,
    reapplyCount: number,
    rejectionReason: string
  ): Promise<void> {
    console.log('from email service');
    try {
      const info = await this.transporter.sendMail({
        from: `"HireNest" <${process.env.ADMIN_EMAIL}>`,
        to: email,
        subject: `Company Registration Update - ${companyName}`,
        html: companyRejectionEmailTemplate(
          name,
          companyName,
          rejectionReason,
          reapplyCount
        ),
      });

      console.log(
        'nodemailer.getTestMessageUrl:',
        nodemailer.getTestMessageUrl(info)
      );
    } catch (error) {
      console.error('Failed to send rejection email:', error);
      throw new Error('Failed to send Email');
    }
  }
  async sendCompanyApprovalMail(
    email: string,
    name: string,
    companyName: string
  ): Promise<void> {
    console.log('from email service');
    try {
      const info = await this.transporter.sendMail({
        from: `"HireNest" <${process.env.ADMIN_EMAIL}>`,
        to: email,
        subject: `Company Registration Update - ${companyName}`,
        html: companyApprovalEmailTemplate(name, companyName),
      });

      console.log(
        'nodemailer.getTestMessageUrl:',
        nodemailer.getTestMessageUrl(info)
      );
    } catch (error) {
      console.error('Failed to send rejection email:', error);
      throw new Error('Failed to send Email');
    }
  }
  async sendInterviewScheduledEmail(
    email: string,
    name: string,
    jobTitle: string,
    companyName: string,
    interviewDate: string,
    interviewTime: string,
    interviewType: 'online' | 'offline',
    meetLink?: string,
    location?: string
  ): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"HireNest" <${process.env.ADMIN_EMAIL}>`,
        to: email,
        subject: `${jobTitle} application Update`,
        html: interviewScheduledEmailTemplate(
          name,
          jobTitle,
          companyName,
          interviewDate,
          interviewTime,
          interviewType,
          meetLink,
          location
        ),
      });

      console.log(
        'nodemailer.getTestMessageUrl:',
        nodemailer.getTestMessageUrl(info)
      );
    } catch (error) {
      console.error('Failed to send rejection email:', error);
      throw new Error('Failed to send Email');
    }
  }
}
import nodemailer from 'nodemailer';
import { companyRejectionEmailTemplate } from '../../shared/company-rejection-email.template';
import { interviewScheduledEmailTemplate } from '../../shared/email-templates/interview-scheduled.template';
