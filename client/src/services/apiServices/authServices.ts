import axiosInstance from '../../libraries/axios';
import { type RegisterFormType } from '../../libraries/validations/auth/registerValidations';
import { AUTH_ENDPOINTS } from '../../constants/apiEndPoints/authEndPoints';
import { email } from 'zod';

export const authService = {
  async registerUser(formData: RegisterFormType) {
    const res = await axiosInstance.post(
      AUTH_ENDPOINTS.USER_REGISTER,
      formData
    );
    return res.data;
  },

  async resentOtp(email: string) {
    const res = await axiosInstance.post(AUTH_ENDPOINTS.RESEND_OTP, {
      email: email,
    });
    return res.data;
  },

  async handleSubmitOtp(otp: string, email: string) {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.SUBMIT_OTP, {
      otp,
      email,
    });
    return response.data;
  },
};
