import { z } from 'zod';

export const jobPostSchema = z
  .object({
    title: z.string().min(3, 'Job title must be at least 3 characters'),

    mode: z.string().min(1, 'Please select a Job mode'),

    jobType: z.string().min(1, 'Please select a Job type'),

    experience: z.string().min(1, 'Please select a experience'),

    vacancyCount: z.string().min(1, 'At least 1 vacancy required'),

    state: z.string().min(1, 'State is required').min(3, 'Invalid state'),

    country: z.string().min(3, 'Country is required'),

    min_salary: z.string().min(1, 'Minimum salary required'),

    max_salary: z.string().min(1, 'Maximum salary required'),

    lastDate: z.string().min(1, 'Please select last date'),

    languages: z.string().min(4, 'Languages required').optional(),

    education: z.string().min(2, 'Education required'),

    description: z
      .string()
      .min(10, 'Description must be at least 10 characters'),

    skills: z
      .array(
        z.object({
          id: z.string().optional(),
        })
      )
      .min(1, 'Add at least one skill'),

    responsibilities: z
      .array(
        z.string().min(5, 'Each responsibility must be at least 5 characters')
      )
      .min(1, 'Add at least one responsibility')
      .optional(),
  })
  .superRefine((data, ctx) => {
    const min = Number(data.min_salary);
    const max = Number(data.max_salary);

    if (max < min) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Max salary must be greater than or equal to min salary',
        path: ['max_salary'],
      });
    }

    const selectedDate = new Date(data.lastDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Add a future date',
        path: ['lastDate'],
      });
    }
  });

export const reportFormSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),

  reason: z.string().min(1, 'Please select a reason for reporting'),

  info: z
    .string()
    .max(100, 'Description is too long')
    .optional()
    .refine((val) => !val || val.length >= 5, 'Please provide more details'),
});
export type JobFormType = z.infer<typeof jobPostSchema>;
