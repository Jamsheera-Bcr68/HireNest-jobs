export const JOB_SORT = {
  NEW: 'newest',
  UPCOMING: 'upcoming',
  APPLICATION_COUNT: 'appCount',
} as const;

export type JobSortType =
  (typeof JOB_SORT)[keyof typeof JOB_SORT];