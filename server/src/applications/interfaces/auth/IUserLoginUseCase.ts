import { IloginInput, loginOutPutDto } from '../../Dtos/loginDto';

export interface IUserLoginUseCase {
  execute(input: IloginInput): Promise<loginOutPutDto>;
}
