import { User } from '../../domain/entities/User';

export interface IRegisterInput {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}
export type IRegisterOutput = User;
