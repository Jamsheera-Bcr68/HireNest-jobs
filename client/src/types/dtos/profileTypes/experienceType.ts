import { type AddExperienceFormData } from '../../../libraries/validations/auth/candidate/experienceFormValidation';

export type ExperienceType = AddExperienceFormData & { id?: string };

export type WorkMode = 'remote' | 'onsite' | 'hybrid';
