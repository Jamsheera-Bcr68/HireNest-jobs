export const API_ENDPOINTS = {
  JOB: '/jobs',
  JOB_DETAILS: (id: string) => `/jobs/${id}`,
  ALL_SKILLS: '/skills',
  REQUESTED_SKILLS: '/skills/requested',
  SKILLS_STATUS: '/skills/skill-status',
  SKILL: (id: string) => `/skills/${id}`,
};
