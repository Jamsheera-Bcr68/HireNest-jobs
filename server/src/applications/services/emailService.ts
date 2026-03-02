import { IEmailService } from '../interfaces/services/IEmailService';
import { emailTemplate } from '../../shared/emailOTPTemplate';
import { emailPasswordResetTemplate } from '../../shared/emailResetLinkTemplate';

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
    console.log('from email servives', email, otp);

    const info = await this.transporter.sendMail({
      from: `"HireNest" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: `Your OTP code`,
      html: emailTemplate(otp),
    });
    console.log(
      '(nodemailer.getTestMessageUrl',
      nodemailer.getTestMessageUrl(info)
    );
  }
  async sendResetPasswordLink(email: string, resetLink: string): Promise<void> {
    const info = await this.transporter.sendMail({
      from: `"HireNest" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: 'Your Pasword resent link ',
      html: emailPasswordResetTemplate(resetLink),
    });
    console.log(nodemailer.getTestMessageUrl(info));
  }
}
import nodemailer from 'nodemailer';
