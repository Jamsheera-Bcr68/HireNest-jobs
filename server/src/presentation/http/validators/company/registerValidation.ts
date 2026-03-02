import z from 'zod';

import {
  Industry_Type,
  Company_Size,
  Country_Name,
  Document_Types,
} from '../../../../domain/types/companyProfileTypes';

const stringValMand = (field: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${field} is mandatory section`)
    .min(min, `${field} should be at least ${min} letters`)
    .max(max, `${field} should not be more than ${max} letters`);

const stringValOpt = (field: string, min: number, max: number) =>
  z.preprocess(
    (val) => (val === '' ? undefined : val),
    z
      .string()
      .trim()
      .min(min, `${field} should be at least ${min} letters`)
      .max(max, `${field} should not be more than ${max} letters`)
      .optional()
  );

const selectVal = <T extends readonly [string, ...string[]]>(
  field: string,
  values: T
) =>
  z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.enum(values, {
      message: `Please select a ${field}`,
    })
  );

export const companyRegisterSchema = z.object({
  companyName: stringValMand('Company Name', 3, 30),
  tagLine: stringValOpt('Tagline', 3, 30).nullable().optional(),
  website: stringValOpt('Website', 6, 50),
  industry: selectVal('Industry', Industry_Type),
  size: selectVal('Company size', Company_Size),

  adress: z.object({
    country: selectVal('Country', Country_Name),
    state: stringValMand('State', 3, 30),
  }),

  email: stringValOpt('Email', 4, 20),

  phone: z.string().max(15, 'Enter a valid phone number').optional(),
  about: stringValMand('About ', 5, 50),

  documents: z.object({
    type: selectVal('Verification document ', Document_Types),
    file: z.string().min(1, 'Please select upload a document'),
  }),

  startedIn: z.string().min(1, 'Please Select Started Year'),
  isAgreed: z.boolean().refine((val) => val === true, {
    message: 'Please agree to terms',
  }),
  isConsent: z.boolean().refine((val) => val === true, {
    message: 'Please agree to verify this',
  }),

  logo: z.string().nullable().optional(),

  links: z.object({
    gitHub: stringValOpt('Github link ', 0, 100).nullable(),
    linkedIn: stringValOpt('linked in profile link ', 0, 100),
    youtube: stringValOpt('Youtube link ', 0, 100),
    whatsapp: stringValOpt('Wahatsapp link ', 0, 100),
    twitter: stringValOpt('Twitter account link ', 0, 100),
    portfolio: stringValOpt('Twitter account link ', 0, 100),
  }),
});

export type CompanyRegisterType = z.infer<typeof companyRegisterSchema>;
