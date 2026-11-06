import { z } from 'zod';

export const interviewSchema = z
  .object({
    mode: z.enum(['online', 'offline']),
    roundName: z.string().min(1, 'Round name is required'),
    interviewerType: z
      .enum(['ai_agent', 'human'])
      .or(z.string().min(1, 'Please select the Interviewer')),
    topics: z
      .string()
      .max(300, 'Topics cannot exceed 300 characters')
      .optional()
      .or(z.literal('')),
    date: z.string().min(1, 'Date is required'),

    time: z.string().min(1, 'Time is required'),

    duration: z.string().min(1, 'Duration is required'),

    isAddlinkLater: z.boolean(),

    meetLink: z
      .string()

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

    if (data.interviewerType === 'ai_agent' && data.mode === 'offline') {
      ctx.addIssue({
        path: ['mode'],
        code: z.ZodIssueCode.custom,
        message: 'AI interviews cannot be conducted in-person',
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
