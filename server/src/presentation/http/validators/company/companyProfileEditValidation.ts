import { z } from 'zod';
import { IAddress } from '../../../../domain/values/profileTypes';
import {
  Industry_Type,
  Company_Size,
} from '../../../../domain/types/companyProfileTypes';

export const companyProfileEditSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),

  tagLine: z
    .string()
    .min(3, 'Tagline must be at least 3 characters')
    .max(120, 'Tagline is too long')
    .or(z.literal('')),

  startedIn: z.string().min(1, 'Please Select a year'),

  industry: z.enum(Industry_Type, { message: 'Please select an industry' }),

  website: z
    .string()
    .url('Please enter a valid website URL')
    .optional()
    .or(z.literal('')),

  address: z
    .object({
      place: z
        .string()
        .min(1, 'Please enter a valid state name')
        .max(20, 'Please enter a valid state name')
        .optional(),
      state: z
        .string()
        .min(1, 'Please enter a valid state name')
        .max(20, 'Please enter a valid state name'),

      country: z
        .string()
        .min(1, 'Please enter a valid country name')
        .max(20, 'Please enter a valid country name'),
    })
    .optional(),

  size: z.enum(Company_Size, { message: 'Please select company size' }),

  socialMediaLinks: z
    .object({
      linkedin: z
        .string()
        .url('Invalid LinkedIn URL')
        .optional()
        .or(z.literal('')),
      twitter: z
        .string()
        .url('Invalid Twitter URL')
        .optional()
        .or(z.literal('')),
      whatsapp: z
        .string()
        .url('Invalid Whatsapp URL')
        .optional()
        .or(z.literal('')),
      youtube: z
        .string()
        .url('Invalid youtube URL')
        .optional()
        .or(z.literal('')),
      github: z.string().url('Invalid github URL').optional().or(z.literal('')),
      portfolio: z
        .string()
        .url('Invalid portfolio URL')
        .optional()
        .or(z.literal('')),
    })
    .optional(),
});
export type CompanyProfileEditType = z.infer<typeof companyProfileEditSchema>;
