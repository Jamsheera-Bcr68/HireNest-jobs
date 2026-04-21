export interface IGetAllEntitiesUsecase<T,F> {
  execute(filter: Partial<F>): Promise<T>;
}
