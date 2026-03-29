import z, { object } from 'zod';
export const jobReportSchema = z.object({
  reason: z.string().trim().min(1, 'Choose a reason'),
  info: z
    .string()
    .trim()
    .min(5, 'Information should be atleast 5 letters')
    .max(200, 'Information should not be exceed 100 letters'),
});

export type reportFormType = z.infer<typeof jobReportSchema>;
