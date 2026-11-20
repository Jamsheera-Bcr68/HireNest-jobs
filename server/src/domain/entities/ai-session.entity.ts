import {
  AISessionStageEnum,
  AISessionStatusEnum,
} from '../enums/interview.enum';

export interface AiSession {
  id: string;
  interviewId: string;
  candidateId: string;
  jobId: string;
  status: AISessionStatusEnum;
  currentQuestionIndex: number;
  startedAt: Date;
  completedAt: Date | null;
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
