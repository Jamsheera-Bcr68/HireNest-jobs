import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email addres'),

  password: z
    .string()
    .trim()
    .min(6, 'Password Should contain atleast 6 charectores'),
});
