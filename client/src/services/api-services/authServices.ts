import axiosInstance from '../../libraries/axios';
import { type RegisterFormType } from '../../libraries/validations/auth/register.validations';
import { AUTH_ENDPOINTS } from '../../constants/api-end-points/auth';
import type { UserRole } from '../../constants/types/user';
import { type ResetPasswordFormType } from '../../libraries/validations/auth/reset-password.validation';

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

  async formgotPasword(email: string, role: UserRole) {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
      email: email,
      role: role,
    });
    return response.data;
  },

  async googleSignIn(token: string, role: UserRole) {
    let api =
      role === 'admin'
        ? AUTH_ENDPOINTS.ADMIN_GOOGLE_AUTH
        : AUTH_ENDPOINTS.USER_GOOGLE_AUTH;

    const response = await axiosInstance.post(api, { token, role });
    return response.data;
  },

  async googleSingnupSubmit(
    formData: { email: string; password: string },
    role: UserRole
  ) {
    const api =
      role === 'admin' ? AUTH_ENDPOINTS.ADMIN_LOGN : AUTH_ENDPOINTS.LOGIN;
    const response = await axiosInstance.post(api, formData);
    return response.data;
  },

  async resetPassword(formData: ResetPasswordFormType) {
    const resposnse = await axiosInstance.post(
      AUTH_ENDPOINTS.RESET_PASSWORD,
      formData
    );
    return resposnse.data;
  },

  async logout() {
    const res = await axiosInstance.post(
      AUTH_ENDPOINTS.LOGOUT,
      {},
      { withCredentials: true }
    );

    return res.data;
  },
};
