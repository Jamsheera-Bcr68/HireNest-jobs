import { IRegisterInput, IRegisterOutput } from '../../Dtos/registerTypes';
export interface IRegisterUseCase {
  execute(input: IRegisterInput): Promise<IRegisterOutput>;
}
