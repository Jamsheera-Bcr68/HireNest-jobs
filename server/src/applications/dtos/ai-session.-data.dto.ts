import {
  AISessionStageEnum,
  InterviewResult,
  InterviewRound,
} from '../../domain/enums/interview.enum';
import { MeetingDto } from './meeting.dto';

export interface AIMeetingDto {
  meeting: MeetingDto;

  aiInterview: {
    sessionId: string;
    status: string;
    stage: AISessionStageEnum;
    totalQuestions: number;
    currentQuestion: {
      questionId: string | null;
      question: string;
      topic: string | null;

      questionNumber: number;
    } | null;
  };
}

export interface SubmitAiAnswerDto {
  candidateId: string;
  sessionId: string;
  questionId: string | null;
  stage: string;
  answer: {
    audio: Buffer<ArrayBufferLike>;
    mimeType: string;
    originalName: string;
  };
}

export interface SubmitAnswerOuputDto {
  sessionId: string;
  completed: boolean;
  stage: AISessionStageEnum;
  id: string | null;
  question: string | null;
  number: number | null;
}

export interface AIAnswerInputDto {
  audio: Buffer;
  mimeType: string;
  currentQuestion: string;
  topics: string[];
  jobTitle: string;
  questionCount: number;
  previousQuestions: string[];
  instructions: string;
  answeredQuestions: number;
  jobDesc: string | null;
  roundName: InterviewRound;
  isLastQuestion: boolean;
}

export interface AIAnswerEvaluationDto {
  transcript: string;
  score: number;
  feedback: string;
  nextQuestion: string;
  topic: string;
}
export interface FinalEvaluationInputDto {
  topics: string[];
  questionsAndAnswers: {
    question: string;
    answer: string;
    score: number;
    feedback: string;
  }[];
  minimumScore: number;
}
export interface FinalEvaluationOutputDto {
  result: InterviewResult;
  score: number;
  feedback: string;
}
