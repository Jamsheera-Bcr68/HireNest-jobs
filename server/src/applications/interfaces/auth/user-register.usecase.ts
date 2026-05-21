import { IRegisterInput, IRegisterOutput } from '../../dtos/register.types';
export interface IRegisterUseCase {
  execute(input: IRegisterInput): Promise<IRegisterOutput>;
}
