export const CANDIDATE_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  JOBS: '/jobs',
  INTERVIEWS: '/interviews',
  APPLICATIONS: '/applications',
  APPLICATION_DETAILS: '/applications/:id',
} as const;

export const COMPANY_ROUTES = {
  HOME: '/',
  REGISTER: '/register',
  DASHBOARD: 'dashboard',
  JOBS: 'jobs',
  CREATE_JOB: 'jobs/create',
  SKILLS: 'skills',
  APPLICATIONS: 'jobs/:jobId/applications',
  APPLICATION_DETAILS: 'applications/:id',
  JOB_DETAILS: 'jobs/:jobId',
  INTERVIEWS: 'interviews',
  PROFILE: 'profile',
} as const;

export const ADMIN_ROUTES = {
  DASHBOARD: '/',
  COMPANIES: '/companies',
  COMPANY_DETAILS: '/companies/:companyId',

  CANDIDATES: '/candidates',
  CANDIDATE_DETAILS: '/candidates/:candidateId',

  JOBS: '/jobs',
  JOB_DETAILS: '/jobs/:jobId',

  PENDINGS: '/pendings',

  SKILLS: '/skills',

  APPLICATIONS: '/jobs/:jobId/applications',
  APPLICATION_DETAILS: '/applications/:id',

  INTERVIEWS: '/interviews',
} as const;
