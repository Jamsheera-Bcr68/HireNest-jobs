import { otpModel, IOtpDocument } from '../../database/models/user/otpModel';
import { IOtpRepository } from '../../../domain/repositoriesInterfaces/IotpRepository';
import { Error, Model } from 'mongoose';
//import { GenericRepository } from "../genericRepository";
import { AppError } from '../../../domain/errors/AppError';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { userMessages } from '../../../shared/constants/messages/userMessages';

export class OtpRepository implements IOtpRepository {
  private _model: Model<IOtpDocument>;

  constructor() {
    this._model = otpModel;
  }
  async save(email: string, otp: string): Promise<Date> {
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000);
    await this._model.findOneAndUpdate(
      { email },
      {
        otp: otp,
        expiredAt: expiresAt,
        createdAt: new Date(),
      },
      { upsert: true }
    );
    return expiresAt;
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const user = await otpModel.findOne({ email });
    if (!user)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    if (!user?.otp || !user.expiredAt || new Date() > user.expiredAt)
      throw new AppError('OTP Expired', statusCodes.BADREQUEST);

    const isValid = user?.otp === otp;
    // console.log('is valid ', isValid);
    if (!isValid) {
      throw new AppError('Invalid OTP', statusCodes.BADREQUEST);
    }
    user.isVerified = true;
    await user.save();
    return true;
  }
  async findOne(email: string): Promise<IOtpDocument | null> {
    const user = await this._model.findOne({ email });
    return user;
  }
}
