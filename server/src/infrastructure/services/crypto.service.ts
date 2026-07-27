import { ICryptoService } from "../../applications/interfaces/services/crypto.service";
import crypto from 'crypto'

export class CryptoService implements ICryptoService{
    constructor(){}

    meetIdGenerator(): string {
        const  link=crypto.randomUUID();
        return link
    }
}