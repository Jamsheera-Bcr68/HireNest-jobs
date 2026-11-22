export enum InterviewMode {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export enum InterviewResult {
  PASSED = 'passed',
  FAILED = 'failed',
  PENDING = 'pending',
}

export enum InterviewRound {
  SCREENING = 'screening',
  TECHNICAL = 'technical',
  HR_ROUND = 'hr_behavioral',
  MANAGERICAL = 'managerial',
  ASSIGNMENT = 'assignment',
}

export enum Interviewer {
  HUMAN = 'human',
  AI_AGENT = 'ai_agent',
}

export enum AISessionStatusEnum {
  IN_PROGRESS = 'in-progress',
  PENDING = 'pending',
  COMPLETED = 'completed',
}
export enum AISessionStageEnum {
  WELCOME = 'welcome',
  INTRODUCTION = 'introduction',
  QUESTIONS = 'questions',
  COMPLETED = 'completed',
}

export enum ViolationEnum {
  TAB_HIDDEN = 'tab_hidden',
  WINDOW_HIDDEN = 'window_blur',
  FULLSCREEN_EXIT = 'fullscreen_exit',
  WINDOW_RESIZED = 'window_resized',
}
