import { Types } from 'mongoose';
import { Education } from '../../../domain/entities/Education';
import { IEducationRepository } from '../../../domain/repositoriesInterfaces/IEducationRepository';
import {
  IEducationDocument,
  educationModel,
} from '../../database/models/user/educationModel';
import { GenericRepository } from '../genericRepository';

export class EducationRepository
  extends GenericRepository<Education, IEducationDocument>
  implements IEducationRepository
{
  constructor() {
    super(educationModel);
  }
  protected mapToEntity(doc: IEducationDocument): Education {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      level: doc.level,
      status: doc.status,
      location: doc.location,
      startYear: doc.startYear,
      completedYear: doc.completedYear,
      university: doc.university,
      institution: doc.institution,
      cgpa: doc.cgpa,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
  protected mapToPersistance(
    entity: Partial<Education>
  ): Partial<IEducationDocument> {
    return {
      userId: new Types.ObjectId(entity.userId),
      level: entity.level,
      status: entity.status,
      location: entity.location,
      startYear: entity.startYear,
      completedYear: entity.completedYear,
      university: entity.university,
      institution: entity.institution,
      cgpa: entity.cgpa,
    };
  }
  async addEducation(data: Partial<Education>): Promise<Education | null> {
    console.log('data from the front end', data);

    const education = await this._model.create(this.mapToPersistance(data));
    if (!education) return null;
    return this.mapToEntity(education);
  }
  async editEducation(
    eduId: string,
    data: Partial<Education>
  ): Promise<Education | null> {
    console.log('data from edu repo ', data);

    const education = await this._model.findByIdAndUpdate(
      eduId,
      this.mapToPersistance(data),
      { new: true }
    );
    if (!education) return null;
    return this.mapToEntity(education);
  }
  async getAllEducations(userId: string): Promise<Education[] | []> {
    console.log('userId ', userId);

    const docs = await this._model.find({ userId: new Types.ObjectId(userId) });
    if (!docs.length) return [];
    return docs.map((doc) => this.mapToEntity(doc));
  }
}
