import { ISendOtpService } from '../interfaces/services/ISendOtpservice';
import { IGenerateOtpService } from '../interfaces/services/IGeneratorOtpService';
import { IEmailService } from '../interfaces/services/IEmailService';
import { IOtpRepository } from '../../domain/repositoriesInterfaces/IotpRepository';

export class SendOtpService implements ISendOtpService {
  private readonly _otpGenerator: IGenerateOtpService;
  private readonly _emailServices: IEmailService;
  private readonly _otpRepository: IOtpRepository;
  constructor(
    otpGenerator: IGenerateOtpService,
    emailServices: IEmailService,
    otpRepository: IOtpRepository
  ) {
    this._otpGenerator = otpGenerator;
    this._emailServices = emailServices;
    this._otpRepository = otpRepository;
  }

  async execute(email: string): Promise<Date> {
    console.log(`from sendotp service `, email);

    const otp = this._otpGenerator.generate();
    console.log('otp is ', otp);

    const otp_expiry = await this._otpRepository.save(email, otp);
    console.log('otp_expiry from sent service ', otp_expiry);

    this._emailServices.sendOtp(email, otp);
    return otp_expiry;
  }
}
