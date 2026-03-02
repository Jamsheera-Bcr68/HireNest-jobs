import z from 'zod';
import {
  EDUCATION_LEVELS,
  EDUCATION_STATUS,
} from '../../../../types/dtos/profileTypes/educationTypes';

export const educationSchema = z
  .object({
    level: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z.enum(EDUCATION_LEVELS, {
        message: 'Please select education level',
      })
    ),

    institution: z
      .string()
      .min(1, 'Institute is required')
      .max(30, 'Institute name should not exceed 30 letters')
      .min(3, 'Institute name should be 3 letters'),
    university: z
      .string()
      .min(1, 'University is required')
      .max(30, 'University name should not exceed 30 letters')
      .min(3, 'University name should be 3 letters'),

    location: z
      .string()
      .min(1, 'Location is required')
      .max(30, ' Location should not exceed 30 letters')
      .min(3, 'location should be 3 letters'),

    status: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z.enum(EDUCATION_STATUS, {
        message: 'Please select status',
      })
    ),

    startYear: z
      .string()
      .min(1, 'Start year is required')
      .transform((val: string) => Number(val)),

    completedYear: z
      .string()
      .optional()
      .transform((val) => Number(val)),

    cgpa: z
      .string()
      .min(1, 'CGPA is required')
      .transform((val) => Number(val))
      .refine(
        (num) => num >= 0 && num <= 100,
        'CGPA must be between 0 and 100'
      ),
  })
  .refine(
    (data) => {
      if (data.completedYear) {
        return data.completedYear >= data.startYear;
      }
      return true;
    },
    {
      message: 'Completion year should be greater than or equal to start year',
      path: ['completedYear'],
    }
  );

export type EducationFormData = z.infer<typeof educationSchema>;
