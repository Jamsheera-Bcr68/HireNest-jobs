export enum JobType {
  PART_TIME = 'partTime',
  FULL_TIME = 'fullTime',
}

export const Experience_LEVELS = [
  '0-1',
  '1-2',
  '2-3',
  '3-4',
  '4-5',
  '5+',
] as const;
export type ExperienceType = (typeof Experience_LEVELS)[number];
