import { z } from 'zod';
const socialLinksSchema = z.object({
  gitHub: z.string().url('Invalid GitHub URL').optional(),
  linkedIn: z.string().url('Invalid LinkedIn URL').optional(),
  twitter: z.string().url('Invalid Twitter URL').optional(),
  portfolio: z.string().url('Invalid Portfolio URL').optional(),
  youtube: z.string().url('Invalid YouTube URL').optional(),
  whatsapp: z.string().min(5, 'Invalid WhatsApp number').optional(),
});

export const updateCompanyFieldSchema = z
  .object({
    about: z
      .string()
      .min(5, 'About should be atleast 5 letters')
      .max(500, 'About should be atmost 500 letters')
      .optional(),
    mission: z
      .string()
      .min(5, 'Mission should be atleast 5 letters')
      .max(300, 'Mission should be atmost 300 letters')
      .optional(),
    vision: z
      .string()
      .min(5, 'Vision should be atleast 5 letters')
      .max(300, 'vision should be atmost 300 letters')
      .optional(),
    culture: z
      .string()
      .min(5, 'culture should be atleast 5 letters')
      .max(500, 'Culture should be atmost 500 letters')
      .optional(),
    benefits: z
      .array(
        z
          .string()
          .min(5, 'benefits should be atleast 5 letters')
          .max(50, 'benefits should be atmost 500 letters')
      )
      .min(5, 'Add atleast one')
      .optional(),
    socialMediaLinks: socialLinksSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });
export type CompanyUpdateFiedType = z.infer<typeof updateCompanyFieldSchema>;
