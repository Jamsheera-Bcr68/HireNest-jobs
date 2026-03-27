export const CANDIDATE_API_ENDPOINTS = {
  HOME_DATA: '/candidate/home',
  JOB: '/jobs',
  JOB_DETAILS: (id: string) => `/jobs/${id}`,
};
