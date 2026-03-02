import { z } from 'zod';

const optionalString = (min: number, max: number, label: string) =>
  z.preprocess(
    (val) => (typeof val === 'string' && val === '' ? undefined : val),
    z
      .string()
      .min(min, `${label} must be at least ${min} characters`)
      .max(max, `${label} is too long`)
      .optional()
  );

export const profileDataSchema = z.object({
  name: optionalString(2, 50, 'Name'),
  title: optionalString(2, 50, 'Title'),
  place: optionalString(2, 50, 'Place'),
  state: optionalString(2, 50, 'State'),
  country: optionalString(2, 50, 'Country'),
  socialMediaLinks: z
    .object({
      linkedIn: optionalString(2, 100, 'LinkedIn'),
      gitHub: optionalString(2, 100, 'GitHub'),
      whatsapp: optionalString(2, 100, 'WhatsApp'),
      portfolio: optionalString(2, 100, 'PortFolio'),
      twitter: optionalString(2, 100, 'Twitter'),
    })
    .optional(),
});

export type UpdataUserProfileInput = z.infer<typeof profileDataSchema>;

const toYearMonthNumber = (value: string) => {
  const [year, month] = value.split('-').map(Number);
  return year * 100 + month;
};

export const ExperienceSchema = z
  .object({
    title: z.string().trim().min(1).min(5).max(30),

    company: z.string().trim().min(1).min(2),

    mode: z.enum(['onsite', 'remote', 'hybrid']),

    location: z.string().trim().optional(),

    startDate: z.string().min(1, 'Start date is required'),

    endDate: z.string().optional(),

    isWorking: z.boolean(),

    description: z.string().trim().max(500).optional(),
  })

  .refine((data) => data.isWorking || !!data.endDate, {
    message: 'End date is required if not currently working',
    path: ['endDate'],
  })

  .refine((data) => data.mode === 'remote' || !!data.location, {
    message: 'Location is required for onsite or hybrid',
    path: ['location'],
  })

  .superRefine((data, ctx) => {
    const today = new Date();
    const currentYM = today.getFullYear() * 100 + (today.getMonth() + 1);

    const startYM = toYearMonthNumber(data.startDate);

    if (startYM > currentYM) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Start date cannot be in the future',
        path: ['startDate'],
      });
    }

    if (data.endDate) {
      const endYM = toYearMonthNumber(data.endDate);

      if (endYM > currentYM) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End date cannot be in the future',
          path: ['endDate'],
        });
      }

      if (endYM < startYM) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End date cannot be before start date',
          path: ['endDate'],
        });
      }
    }
  });

export type ExperienceDto = z.infer<typeof ExperienceSchema>;
