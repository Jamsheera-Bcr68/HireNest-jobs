import z from 'zod';
import {
  EducationStatus,
  EducationLevel,
} from '../../../domain/enums/EducationEnum';
import { NextFunction, Request, Response } from 'express';

const educationSchema = z
  .object({
    level: z.nativeEnum(EducationLevel, {
      message: 'Please select a educationa level',
    }),
    institution: z
      .string()
      .trim()
      .min(1, 'Please enter intitute name')
      .min(5, 'Institute name should be atleast 5 letters')
      .max(30, 'Institute name should not exceed 30 letters'),
    status: z.nativeEnum(EducationStatus, {
      message: 'Please select a Education status',
    }),
    startYear: z.preprocess(
      (val) => (val === '' ? undefined : Number(val)),
      z.number({ message: 'Start year is required' })
    ),
    completedYear: z.preprocess(
      (val) => (val === '' ? undefined : Number(val)),
      z.number().optional()
    ),
    university: z
      .string()
      .trim()
      .min(1, 'Please enter University name')
      .min(3, 'University name should be atleast 3 letters')
      .max(30, 'University name should not exceed 30 letters'),
    location: z
      .string()
      .trim()
      .min(1, 'Please enter Location ')
      .min(3, 'Location name should be atleast 3 letters')
      .max(30, 'Location name should not exceed 30 letters'),
    cgpa: z.preprocess(
      (val) => (val === '' ? undefined : Number(val)),
      z.number({ message: 'Please enter valid Percentage' }).min(0).max(100)
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
      message: 'Completion year should be greater than start year',
      path: ['completedYear'],
    }
  );

export function educationValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = educationSchema.safeParse(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

export type EducationType = z.infer<typeof educationSchema>;
