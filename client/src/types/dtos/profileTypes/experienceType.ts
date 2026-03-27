import { type AddExperienceFormData } from '../../../libraries/validations/auth/candidate/experienceFormValidation';

export type ExperienceType = AddExperienceFormData & { id?: string };

export type WorkMode = 'remote' | 'onsite' | 'hybrid';

export const SalaryType = [
  '₹0 - ₹10k',
  '₹10k - ₹25k',
  '₹25k - ₹50k',
  '₹50k - ₹100k',
  '₹100k +',
];

export const Experience_Types = [
  '0-1',
  '1-2',
  '2-3',
  '3-4',
  '4-5',
  '5+',
] as const;
