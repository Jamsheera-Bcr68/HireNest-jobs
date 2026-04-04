export const CANDIDATE_API_ENDPOINTS = {
  HOME_DATA: '/candidate/home',

  REPORT_JOB: (jobId: string) => `/jobs/${jobId}/reports`,
  SAVE_JOB: (jobId: string) => `/jobs/${jobId}/save`,
  UNSAVE_JOB: (jobId: string) => `/jobs/${jobId}/unsave`,
  SAVED_JOBS: `/jobs/saved`,
};
