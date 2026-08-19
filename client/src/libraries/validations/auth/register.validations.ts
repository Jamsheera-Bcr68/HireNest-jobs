import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email addres'),
    phone: z
      .string()
      .min(1, 'Phone number cannot be empty')
      .min(10, 'Phone number must be at least 10 digits')
      .regex(/^[0-9]+$/, 'Phone number must contain only digits'),
    password: z
      .string()
      .trim()
      .min(1, 'Phone number cannot be empty')
      .min(6, 'Password Should contain atleast 6 charectores')
      .regex(/[A-Z]/, 'Password should contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password should contain at least one lowercase '),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type RegisterFormType = z.infer<typeof registerSchema>;
