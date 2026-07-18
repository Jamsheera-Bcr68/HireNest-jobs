import { IloginInput, loginOutPutDto } from '../../dtos/login.dto';

export interface IUserLoginUseCase {
  execute(input: IloginInput): Promise<loginOutPutDto>
}
