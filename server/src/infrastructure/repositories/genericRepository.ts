import { Model, Types, UpdateQuery } from 'mongoose';
import { IBaseRepository } from '../../domain/repositoriesInterfaces/IBaseRepository';

export abstract class GenericRepository<
  T extends { id?: string },
  D extends { _id: Types.ObjectId },
> implements IBaseRepository<T> {
  protected _model: Model<D>;

  constructor(model: Model<D>) {
    this._model = model;
  }
  async create(data: Partial<T>): Promise<T> {
    const doc = await this._model.create(this.mapToPersistance(data));
    return this.mapToEntity(doc);
  }
  async findOne(filter: Partial<T>): Promise<T | null> {
    const { id, ...rest } = filter;
    const query = { ...rest } as Partial<D>;
    if (id) {
      query._id = new Types.ObjectId(id);
    }

    const document = await this._model.findOne(query);

    if (!document) return null;
    else return this.mapToEntity(document);
  }
  async save(id: string, data: Partial<T>): Promise<T | null> {
    console.log('entity from generic  repo ', data);
    const persisted = this.mapToPersistance(data);
    console.log('persisted ', persisted);

    const updated = await this._model.findByIdAndUpdate(
      id,
      persisted as UpdateQuery<D>,
      { new: true }
    );
    console.log('updated from user after savig repo', updated);

    if (!updated) return null;
    return this.mapToEntity(updated);
  }
  async findById(id: string): Promise<T | null> {
    console.log('from general reppo findby id');

    const doc = await this._model.findById(id);
    if (!doc) return null;
    return this.mapToEntity(doc);
  }
  async getAll(filter: Partial<T>): Promise<T[] | []> {
    const docs = await this._model.find(filter);
    if (!docs.length) return [];
    return docs.map((doc) => this.mapToEntity(doc));
  }
  async deleteById(id: string): Promise<void> {
    await this._model.findByIdAndDelete(id);
  }
  protected abstract mapToEntity(doc: D): T;
  protected abstract mapToPersistance(entity: Partial<T>): Partial<D>;
}
