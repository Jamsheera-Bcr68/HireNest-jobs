import { IVerifyOtpService } from '../interfaces/services/IVerifyOtpService';
import { IOtpRepository } from '../../domain/repositoriesInterfaces/IotpRepository';
import { IUserRepository } from '../../domain/repositoriesInterfaces/IUserRepositories';
import { AppError } from '../../domain/errors/AppError';

export class VerifyOtpService implements IVerifyOtpService {
  private _otpRepository: IOtpRepository;
  private _userRepository: IUserRepository;

  constructor(otprepository: IOtpRepository, userRepository: IUserRepository) {
    this._otpRepository = otprepository;
    this._userRepository = userRepository;
  }
  async execute(email: string, otp: string): Promise<boolean> {
    try {
      await this._otpRepository.verifyOtp(email, otp);

      await this._userRepository.verifyUser(email);
      return true;
    } catch (err: any) {
      if (err.message === 'OTP_EXPIRED') {
        throw new AppError('OTP expired', 400);
      }
      if (err.message === 'INVALID_OTP') {
        throw new AppError('Invalid OTP', 400);
      }
      if (err.message === 'USER_NOT_FOUND') {
        throw new AppError('User not found', 404);
      }
      throw err;
    }
  }
}
