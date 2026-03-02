import { type EducationFormData } from '../../../libraries/validations/auth/candidate/educationFormValidation';

export const EDUCATION_LEVELS = [
  'SSLC',
  'Higher Secondary',
  'Diploma',
  "Bachelor's Degree",
  "Master's Degree",
  'PhD',
] as const;
export const EDUCATION_STATUS = ['Passed', 'Failed', 'Ongoing'] as const;

const currentYear = new Date().getFullYear();
export const YEARS = Array.from({ length: 50 }, (_, i) => currentYear - i);

export type EducationStatus = (typeof EDUCATION_STATUS)[number];
export type EducationLevel = (typeof EDUCATION_LEVELS)[number];
export type EducationType = EducationFormData & { id: string };
