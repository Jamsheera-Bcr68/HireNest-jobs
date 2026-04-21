export const CANDIDATE_API_ENDPOINTS = {
  PROFILE: '/candidate/profile',
  ADD_EXPERIENCE: '/candidate/profile/experience',
  UPDATE_EXPERIENCE: (id: string) => `/candidate/profile/experience/${id}`,
  REMOVE_EXPERIENCE: (id: string) => `/candidate/profile/experience/${id}`,
  ADD_EDUCATION: '/candidate/profile/education',
  UPDATE_EDUCATION: (id: string) => `/candidate/profile/education/${id}`,
  REMOVE_EDUCATION: (id: string) => `/candidate/profile/education/${id}`,
  ADD_SKILL: (id: string) => `/candidate/profile/skills/${id}`,
  REMOVE_SKILL: (id: string) => `/candidate/profile/skills/${id}`,
  ADD_RESUME: '/candidate/profile/resume',
  DELETE_RESUME: (id: string) => `/candidate/profile/resume/${id}`,

  HOME_DATA: '/candidate/home',
  REPORT_JOB: (jobId: string) => `/jobs/${jobId}/reports`,
  SAVE_JOB: (jobId: string) => `/jobs/${jobId}/save`,
  UNSAVE_JOB: (jobId: string) => `/jobs/${jobId}/unsave`,
  SAVED_JOBS: `/jobs/saved`,
 RESUMES:(candidateId:string)=>`/candidate/${candidateId}/resumes`
};
