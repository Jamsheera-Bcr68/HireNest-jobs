import { AISessionStatusEnum, ViolationEnum } from '../enums/interview.enum';

export interface AiSession {
  id: string;
  interviewId: string;
  candidateId: string;
  jobId: string;
  status: AISessionStatusEnum;
  currentQuestionIndex: number;
  startedAt: Date;
  completedAt: Date | null;
  violations: Violation[];
  introduction: {
    question: string;

    answer: string;
    feedback: string;
    score: number;
    status: AISessionStatusEnum;
  };

  finalEvaluation: Date | null;
  topics: string[];
  duration: number;
  totalQuestions: number;
  questions: {
    id: string | null;
    question: string;
    topic: string | null;

    answer: string | null;
    feedback: string | null;
    score: number | null;
    status: string;
  }[];
}

export interface Violation {
  type: ViolationEnum;
  at: Date;
  durationMs: number;
  questionId?: string;
  stage: 'questions' | 'introduction';
}
