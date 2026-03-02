import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, 'Password cannot be empty')
      .min(6, 'Password should be atleast 6  charectors')
      .max(10, 'Password should atmost 10 charectores'),
    confirm_password: z.string().min(1, 'Password cannot be empty'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Password not matching',
    path: ['confirm_password'],
  });
