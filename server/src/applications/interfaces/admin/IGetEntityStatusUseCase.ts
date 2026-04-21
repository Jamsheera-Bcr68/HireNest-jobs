export interface IGetEntityStatusUseCase<T> {
  execute(userId?:string): Promise<T>;
}
