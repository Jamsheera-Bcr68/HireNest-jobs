import { IEmailService } from '../interfaces/services/email.service';
import { emailTemplate } from '../../shared/email-OTP-template';
import { emailPasswordResetTemplate } from '../../shared/email-reset-link-template';

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
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length);
    console.log('from email services', email, otp);
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
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log(
      'EMAIL_PASS exists:',
      !!process.env.EMAIL_PASS,
      'length:',
      process.env.EMAIL_PASS?.length
    );

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
}
import nodemailer from 'nodemailer';
