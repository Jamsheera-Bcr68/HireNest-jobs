import { Request, Response } from 'express';
export interface ILogoutUsecase {
  execute(req: Request, res: Response): Promise<void>;
}
