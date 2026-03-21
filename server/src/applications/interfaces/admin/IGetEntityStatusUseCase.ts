export interface IGetEntityStatusUseCase<T> {
  execute(): Promise<T>;
}
