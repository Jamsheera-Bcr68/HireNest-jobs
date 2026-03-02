import { AppError } from '../../domain/errors/AppError';
import { authMessages } from '../../shared/constants/messages/authMesages';
import { statusCodes } from '../../shared/enums/statusCodes';
import { IGoogleAuthServices } from '../interfaces/services/IGoogleAuthServices';
import { IGoogleAuthDto } from '../Dtos/loginDto';

export class GoogleAuthService implements IGoogleAuthServices {
  constructor() {}
  async getUserInfo(token: string): Promise<IGoogleAuthDto> {
    console.log('from google auth service , token ', token);
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) {
      throw new AppError(
        authMessages.error.GOOGLE_ACCESS_TOKEN_INVALID,
        statusCodes.BADREQUEST
      );
    }
    const data = await response.json();
    if (!data.email || !data.email_verified) {
      throw new Error('Google email not verified');
    }
    return {
      email: data?.email,
      isVerified: data.email_verified,
      name: data?.name,
      googleId: data?.sub,
    };
  }
}
