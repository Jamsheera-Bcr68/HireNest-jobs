import { z } from 'zod';
import { WorkMode } from '../../../../domain/enums/WorkMode';
import {
  JobType,
  ExperienceType,
  Experience_LEVELS,
} from '../../../../domain/types/jobTypes';

export const jobPostSchema = z
  .object({
    title: z.string().min(3, 'Job title must be at least 3 characters'),

    mode: z.nativeEnum(WorkMode, {
      message: 'Please select a valid job mode',
    }),
    jobType: z.nativeEnum(JobType, {
      message: 'Please select a valid job type',
    }),

    experience: z.enum(Experience_LEVELS, {
      message: 'Please select valid experience',
    }),

    vacancyCount: z.string().min(1, 'At least 1 vacancy required'),

    state: z.string().min(3, 'State is required'),

    country: z.string().min(3, 'Country is required'),

    min_salary: z.coerce.number().min(1, 'Minimum salary required'),

    max_salary: z.coerce.number().min(1, 'Maximum salary required'),

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
      .min(1, 'Add at least one skill')
      .max(5, 'Add at most five skill'),

    responsibilities: z
      .array(
        z.string().min(5, 'Each responsibility must be at least 5 characters')
      )
      .max(1, 'Add at most 5 responsibility')
      .optional(),
  })
  .superRefine((data, ctx) => {
    const min = data.min_salary;
    const max = data.max_salary;

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

export type JobReqDto = z.infer<typeof jobPostSchema>;
