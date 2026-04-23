export const API_ENDPOINTS = {
  JOB: '/jobs',
  JOB_DETAILS: (id: string) => `/jobs/${id}`,
  ALL_SKILLS: '/skills',
  REQUESTED_SKILLS: '/skills/requested',
  SKILLS_STATUS: '/skills/skill-status',
  SKILL: (id: string) => `/skills/${id}`,

  APPLY_JOB: (id: string) => `/applications/${id}`,
  CANDIDATE_APPLICATON_STATUS: '/applications/applications-status',
  APPLICATIONS: '/applications',
  APPLICATION: (id: string) => `/applications/${id}`,
  COMPANY_DATA: (id: string) => `/company/${id}`,

  INTERVIEWS: '/interviews',
};
