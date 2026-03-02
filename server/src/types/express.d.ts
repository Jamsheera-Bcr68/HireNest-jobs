import type { TokenPayload } from '../applications/interfaces/services/ITokenService';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};
