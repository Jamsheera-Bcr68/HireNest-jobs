import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .trim()
      .email('Invalid email addres'),
    phone: z.string().min(10, 'Phone number must be atleast 10  digits'),
    password: z
      .string()
      .min(6, 'Password Should contain atleast 6 charectores'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const otpSchema = z.object({
  email: z.string().trim().min(1, 'email is required'),
  otp: z
    .string()
    .trim()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only digits'),
});
export const resendOtpSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'email is required')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'invalid email format'),
});
