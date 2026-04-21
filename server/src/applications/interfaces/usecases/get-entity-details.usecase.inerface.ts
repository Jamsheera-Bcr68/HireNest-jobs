export interface IGetEntityDetailsUsecase<T> {
  execute(id: string, userId: string, role: string): Promise<T>;
}
