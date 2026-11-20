import { GenericRepository } from './generic.repository';
import { AiSession } from '../../domain/entities/ai-session.entity';
import {
  IAIsessionDocument,
  aiInterviewSessionModel,
} from '../database/models/ai-interview-session.model';
import { IAiSessionRepository } from '../../domain/repository-interfaces/ai-session.repository.interface';
import mongoose from 'mongoose';

export class AISessionRepository
  extends GenericRepository<AiSession, IAIsessionDocument>
  implements IAiSessionRepository
{
  constructor() {
    super(aiInterviewSessionModel);
  }
  async getSessionData(sessionId: string): Promise<AiSession | null> {
    const sessionData = await this._model.findById(
      new mongoose.Types.ObjectId(sessionId)
    );
    if (!sessionData) return null;
    return this.mapToEntity(sessionData);
  }

  protected mapToEntity(doc: IAIsessionDocument): AiSession {
    return {
      id: doc._id.toString(),
      interviewId: doc.interviewId.toString(),
      candidateId: doc.candidateId.toString(),
      jobId: doc.jobId.toString(),
      status: doc.status,
      currentQuestionIndex: doc.currentQuestionIndex,
      startedAt: doc.startedAt,
      completedAt: doc.completedAt,

      finalEvaluation: doc.finalEvaluation,
      topics: doc.topics,
      duration: doc.duration,
      totalQuestions: doc.totalQuestions,
      introduction: doc.introduction,
      questions: doc.questions.map((q) => ({
        id: q._id.toString(),
        question: q.question,
        topic: q.topic,

        answer: q.answer,
        feedback: q.feedback,
        score: q.score,
        status: q.status,
      })),
    };
  }

  protected mapToPersistance(
    entity: Partial<AiSession>
  ): Partial<IAIsessionDocument> {
    const data: Partial<IAIsessionDocument> = {};
    if (entity.jobId) data.jobId = new mongoose.Types.ObjectId(entity.jobId);
    if (entity.candidateId)
      data.candidateId = new mongoose.Types.ObjectId(entity.candidateId);
    if (entity.interviewId)
      data.interviewId = new mongoose.Types.ObjectId(entity.interviewId);
    if (entity.status) data.status = entity.status;
    if (entity.currentQuestionIndex)
      data.currentQuestionIndex = entity.currentQuestionIndex;
    if (entity.startedAt) data.startedAt = entity.startedAt;
    if (entity.completedAt) data.completedAt = entity.completedAt;
    if (entity.finalEvaluation) data.finalEvaluation = entity.finalEvaluation;
    if (entity.topics) data.topics = entity.topics;
    if (entity.duration) data.duration = entity.duration;
    if (entity.totalQuestions) data.totalQuestions = entity.totalQuestions;
    if (entity.introduction) data.introduction = entity.introduction;

    if (entity.questions)
      data.questions = entity.questions.map((q) => ({
        _id: q.id
          ? new mongoose.Types.ObjectId(q.id)
          : new mongoose.Types.ObjectId(),
        question: q.question,
        topic: q.topic,

        answer: q.answer,
        feedback: q.feedback,
        score: q.score,
        status: q.status,
      }));

    return data;
  }
}
