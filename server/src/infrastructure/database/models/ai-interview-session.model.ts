import mongoose, { Types, Schema, Model, model } from 'mongoose';
import {
  ViolationEnum,
  AISessionStatusEnum,
} from '../../../domain/enums/interview.enum';

export interface IViolation {
  type: ViolationEnum;
  at: Date;
  durationMs: number;
  questionId?: Types.ObjectId;
  stage: 'questions' | 'introduction';
}

export interface IAIsessionDocument {
  _id: mongoose.Types.ObjectId;
  interviewId: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  status: AISessionStatusEnum;
  currentQuestionIndex: number;
  violations: IViolation[];
  startedAt: Date;
  completedAt: Date;
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
    _id: Types.ObjectId;
    question: string;
    topic: string | null;

    answer: string | null;
    feedback: string | null;
    score: number | null;
    status: string;
  }[];
}

const violationSchema = new Schema<IViolation>(
  {
    type: { type: String, enum: Object.values(ViolationEnum), required: true },
    at: { type: Date, required: true },
    durationMs: { type: Number },
    questionId: { type: mongoose.Types.ObjectId },
  },
  { _id: false } // no separate _id for each violation
);

const aiInterviewSessionSchema = new Schema<IAIsessionDocument>({
  interviewId: { type: Types.ObjectId },
  candidateId: { type: Types.ObjectId },
  jobId: { type: Types.ObjectId },
  status: { type: String, enum: Object.values(AISessionStatusEnum) },
  currentQuestionIndex: { type: Number },
  startedAt: { type: Date },
  completedAt: { type: Date },
  violations: { type: [violationSchema], default: [] },
  introduction: {
    type: {
      question: String,

      answer: String,
      feedback: String,
      score: Number,
    },
  },
  finalEvaluation: { type: Date },
  topics: { type: [String], default: [] },
  duration: { type: Number },
  totalQuestions: { type: Number },

  questions: [
    {
      _id: { type: Types.ObjectId },
      question: { type: String },
      topic: { type: String },

      answer: { type: String },
      feedback: { type: String },
      status: { type: String, enum: Object.values(AISessionStatusEnum) },
      score: { type: Number },
    },
  ],
});

aiInterviewSessionSchema.index({ interviewId: 1 }, { unique: true });
export const aiInterviewSessionModel: Model<IAIsessionDocument> =
  model<IAIsessionDocument>('AISession', aiInterviewSessionSchema);
