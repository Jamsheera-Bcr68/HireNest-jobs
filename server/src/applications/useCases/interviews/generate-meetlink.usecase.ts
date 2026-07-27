import { ICryptoService } from '../../interfaces/services/crypto.service';
import { env } from '../../../infrastructure/config/env';

export interface IGenerateMeetlinkUsecase {
  execute(userId: string): Promise<{ link: string }>;
}

export class GenerateMeetlinkUsecase implements IGenerateMeetlinkUsecase {
  constructor(private _cryptoService: ICryptoService) {}

  async execute(userId: string): Promise<{ link: string }> {
    return {
      link: `${this._cryptoService.meetIdGenerator()}`,
    };
  }
}
