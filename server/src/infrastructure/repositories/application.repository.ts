import { GenericRepository } from './genericRepository';
import { IApplicationRepository } from '../../domain/repositoriesInterfaces/application.repository.interface';
import {
  applicationModel,
  IApplicationDocument,
} from '../database/models/application.model';
import { Application } from '../../domain/entities/application';
import mongoose from 'mongoose';

export class ApplicationRepository
  extends GenericRepository<Application, IApplicationDocument>
  implements IApplicationRepository
{
  constructor() {
    super(applicationModel);
  }
  protected mapToPersistance(
    entity: Partial<Application>
  ): Partial<IApplicationDocument> {
    const data: Partial<IApplicationDocument> = {};
    if (entity.jobId !== undefined)
      data.jobId = new mongoose.Types.ObjectId(entity.jobId);
    if (entity.companyId !== undefined)
      data.companyId = new mongoose.Types.ObjectId(entity.companyId);
    if (entity.candidateId !== undefined)
      data.candidateId = new mongoose.Types.ObjectId(entity.candidateId);
    if (entity.status !== undefined) data.status = entity.status;
    if (entity.rejectedReason !== undefined)
      data.rejectedReason = entity.rejectedReason;

    return data;
  }

  protected mapToEntity(doc: IApplicationDocument): Application {
    return {
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      candidateId: doc.candidateId.toString(),
      jobId: doc.jobId.toString(),
      status: doc.status,
      rejectedReason: doc.rejectedReason ?? undefined,
      appliedAt: doc.appliedAt.toString(),
    };
  }
  async findByUserIdAndJobId(
    userId: string,
    jobId: string
  ): Promise<Application | null> {
    const doc = await this._model.findOne({
      candidateId: new mongoose.Types.ObjectId(userId),
      jobId: new mongoose.Types.ObjectId(jobId),
    });
    if (!doc) return null;
    return this.mapToEntity(doc);
  }
  async getDocsByJobId(jobId: string): Promise<Application[]> {
    const docs = await this._model.find({
      jobId: new mongoose.Types.ObjectId(jobId),
    });
    if (!docs.length) return [];
    return docs.map((doc) => this.mapToEntity(doc));
  }
  async getDocsByUserId(userId: string): Promise<Application[]> {
    const docs = await this._model.find({
      candidateId: new mongoose.Types.ObjectId(userId),
    });
    if (!docs.length) return [];
    return docs.map((doc) => this.mapToEntity(doc));
  }

  // async count(filter: Partial<Application>): Promise<number> {
  //   const { candidateId } = filter;
  //   if (candidateId) {
  //   }
  //   const count = this._model.countDocuments({
  //     candidateId: new mongoose.Types.ObjectId(candidateId),
  //     appliedAt: new Date(),
  //   });
  //   return count;
  // }
}
