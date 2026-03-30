export const CANDIDATE_API_ENDPOINTS = {
  HOME_DATA: '/candidate/home',
  JOB: '/jobs',
  JOB_DETAILS: (id: string) => `/jobs/${id}`,
  REPORT_JOB: (jobId: string) => `/jobs/${jobId}/reports`,
  SAVE_JOB: (jobId: string) => `/jobs/${jobId}/save`,
  UNSAVE_JOB: (jobId: string) => `/jobs/${jobId}/unsave`,
  SAVED_JOBS: `/jobs/saved`,
};
