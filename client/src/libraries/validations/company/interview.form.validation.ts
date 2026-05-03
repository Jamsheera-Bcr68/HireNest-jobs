import { z } from 'zod';

export const interviewSchema = z
  .object({
    mode: z.enum(['online', 'offline']),

    date: z.string().min(1, 'Date is required'),

    time: z.string().min(1, 'Time is required'),

    duration: z.string().min(1, 'Duration is required'),

    isAddlinkLater: z.boolean(),

    meetLink: z
      .string()
      .url('Enter a valid meeting link')
      .optional()
      .or(z.literal('')),

    location: z.string().optional(),

    notes: z.string().max(500, 'Notes too long').optional(),
  })

  .superRefine((data, ctx) => {
    if (data.mode === 'online' && !data.isAddlinkLater && !data.meetLink) {
      ctx.addIssue({
        path: ['meetLink'],
        code: z.ZodIssueCode.custom,
        message: 'Meeting link is required',
      });
    }

    if (data.mode === 'offline' && !data.location) {
      ctx.addIssue({
        path: ['location'],
        code: z.ZodIssueCode.custom,
        message: 'Location is required',
      });
    }

    if (new Date(data.date) < new Date()) {
      ctx.addIssue({
        path: ['date'],
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid date',
      });
    }
  });

export type interviewFormType = z.infer<typeof interviewSchema>;
