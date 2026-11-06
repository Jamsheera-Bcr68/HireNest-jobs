import z from 'zod';

export const interviewFormSchema = z
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
    applicationId: z.string().min(1, 'Application id is not found'),
    meetLink: z
      .string()
      .url('Enter a valid meeting link')
      .optional()
      .or(z.literal('')),

    location: z.string().optional(),

    notes: z.string().max(500, 'Notes too long').optional(),
  })

  .superRefine((data, ctx) => {
 if (data.interviewerType === 'ai_agent' && data.mode === 'offline') {
      ctx.addIssue({
        path: ['mode'],
        code: z.ZodIssueCode.custom,
        message: 'AI interviews cannot be conducted in-person',
      });
    }

    // If online interview AND link not added later → meeting link required
    if (data.mode === 'online' && !data.isAddlinkLater && !data.meetLink) {
      ctx.addIssue({
        path: ['meetLink'],
        code: z.ZodIssueCode.custom,
        message: 'Meeting link is required',
      });
    }

    // If offline interview → location required
    if (data.mode === 'offline' && !data.location) {
      ctx.addIssue({
        path: ['location'],
        code: z.ZodIssueCode.custom,
        message: 'Location is required',
      });
    }
  });
