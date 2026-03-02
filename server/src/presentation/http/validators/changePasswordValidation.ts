import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, 'current password is required'),
    password: z
      .string()
      .trim()
      .min(1, 'Phone number cannot be empty')
      .min(6, 'Password should be 6 charectores')
      .max(15, 'Password should be 6 charectores'),
    confirm_password: z.string(),
  })
  .refine((data) => data.confirm_password == data.password, {
    message: 'Passwords are not matching',
    path: ['confirm_password'],
  });
