import { z } from 'zod';

export const addExperienceSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, 'Title is compulsory')
      .min(5, 'Title should be at least 5 characters')
      .max(30, 'Title should not exceed 30 characters'),

    company: z
      .string()
      .trim()
      .min(1, 'Company name is compulsory')
      .min(2, 'Company name is too short'),

    mode: z.enum(['onsite', 'remote', 'hybrid']),

    location: z.string().trim().optional(),

    startDate: z.string().min(1, 'Start date is required'),

    endDate: z.string().optional(),

    isWorking: z.boolean(),

    description: z
      .string()
      .trim()
      .max(500, 'Description should not exceed 500 characters')
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.isWorking) {
        return !!data.endDate;
      }
      return true;
    },
    {
      message: 'End date is required if you are not currently working here',
      path: ['endDate'],
    }
  )
  .refine(
    (data) => {
      if (data.mode !== 'remote') {
        return !!data.location;
      }
      return true;
    },
    {
      message: 'Location is required for onsite or hybrid work',
      path: ['location'],
    }
  );

export type AddExperienceFormData = z.infer<typeof addExperienceSchema>;
