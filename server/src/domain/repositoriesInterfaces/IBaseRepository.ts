export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  findOne(filter: Partial<T>): Promise<T | null>;
  save(id: string, data: Partial<Omit<T, 'id'>>): Promise<T | null>;
  getAll(filter: Partial<T>): Promise<T[] | []>;
  deleteById(id: string): Promise<void>;
  create(data: Partial<T>): Promise<T>;
}
