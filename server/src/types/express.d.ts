import type { TokenPayload } from '../applications/interfaces/services/token.service';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};
