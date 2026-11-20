import type { RoundType } from './dtos/interview.dto';

export const Rounds: Record<RoundType, string> = {
  screening: 'Screening',
  technical: 'Techncal',
  hr_behavioral: 'HR ',
  managerial: 'Managerical',
  assignment: 'Assignment ',
};

export type AiInterview = {
  sessionId: string;
  currentQuestion: {
    questionId: string | null;
    question: string;
    questionNumber: number;
    topic: string | null;
  };
  status: InterviewStatus;
  stage: InterviewStage;
  totalQuestions: number;
};

export type Question = {
  id: string;
  sessionId: string;
  question: string;
  number: number;
  stage: InterviewStage;
  completed: boolean;
};

export type InterviewStage =
  | 'welcome'
  | 'introduction'
  | 'completed'
  | 'questions';


  
export type InterviewStatus =
  | 'pending'
  | 'in-progress'
  | 'questions'
  | 'completed';
