import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').trim().email('Invalid email'),
  password: z
    .string()
    .trim()
    .min(6, 'Password Should be atleast 6')
    .max(10, 'Password should be atmost 10 charectors'),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email addres')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  role: z.string().min(1, 'Role is not found'),
});
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, 'Password should be atleast 6  charectors')
      .max(10, 'Password should atmost 10 charectores'),
    confirm_password: z.string(),
    resetToken: z.string().min(1, 'Invalid Reset Link'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Password not matching',
    path: ['confirm_password'],
  });

export const googeLoginSchema = z.object({
  token: z.string().trim().min(1, 'token is missing'),
});
