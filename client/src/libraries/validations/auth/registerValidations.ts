import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email addres'),
    phone: z
      .string()
      .min(1, 'Phone number cannot be empty')
      .min(10, 'Phone number must be atleast 10  digits'),
    password: z
      .string()
      .min(1, 'Phone number cannot be empty')
      .min(6, 'Password Should contain atleast 6 charectores'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });
