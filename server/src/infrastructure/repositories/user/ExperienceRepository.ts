import { Types } from 'mongoose';
import { Experience } from '../../../domain/entities/Experience';
import { IExperienseRepository } from '../../../domain/repositoriesInterfaces/IExperienceRepository';
import {
  ExperienceModel,
  IExperienceDocument,
} from '../../database/models/user/experienceModel';
import { GenericRepository } from '../genericRepository';

export class ExperieceRepository
  extends GenericRepository<Experience, IExperienceDocument>
  implements IExperienseRepository
{
  constructor() {
    super(ExperienceModel);
  }

  protected mapToEntity(doc: IExperienceDocument): Experience {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),

      title: doc.title,
      company: doc.company,
      mode: doc.mode,
      startDate: doc.startDate,
      endDate: doc.endDate ?? undefined,
      location: doc.location,
      description: doc.description,
      isWorking: doc.isWorking,
    };
  }
  protected mapToPersistance(
    entity: Partial<Experience>
  ): Partial<IExperienceDocument> {
    return {
      userId: new Types.ObjectId(entity.userId),

      title: entity.title,
      company: entity.company,
      mode: entity.mode,
      startDate: entity.startDate,
      endDate: entity.endDate ?? undefined,
      location: entity.location,
      description: entity.description,
      isWorking: entity.isWorking,
    };
  }
  async addExperience(data: Partial<Experience>): Promise<Experience | null> {
    const doc = await this._model.create(this.mapToPersistance(data));
    if (!doc) return null;
    return this.mapToEntity(doc);
  }
  async editExperience(
    expId: string,
    data: Partial<Experience>
  ): Promise<Experience | null> {
    const doc = await this._model.findByIdAndUpdate(
      expId,
      this.mapToPersistance(data),
      { new: true }
    );
    if (!doc) return null;
    return this.mapToEntity(doc);
  }
}
