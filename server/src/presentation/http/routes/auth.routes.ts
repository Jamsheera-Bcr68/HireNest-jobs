import express from 'express';
import {
  otpValidator,
  registerValidator,
  resendOtpValidator,
} from '../middleweres/validatores/register-validator';
import {
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  googeLoginValidator,
} from '../middleweres/validatores/login-validator';
import { authController } from '../../../infrastructure/config/di';
import { refreshController } from '../../../infrastructure/config/di';
import { adminAuthController } from '../../../infrastructure/config/di';
import { forgotPasswordController } from '../../../infrastructure/config/di';
import { resetPasswordController } from '../../../infrastructure/config/di';
import {
  googleLoginController,
  adminGoogleAuthController,
  changePasswordController,
} from '../../../infrastructure/config/di';
import { changePasswordValidator } from '../middleweres/validatores/password-validator';
import { authValidator } from '../middleweres/auth-validator';
import { tokenService } from '../../../infrastructure/config/di';
import { AUTH_END_POINTS } from './api-end-points/api-end.points';

const router = express.Router();

router.post(
  AUTH_END_POINTS.REGISTER,
  registerValidator,
  authController.register
);
router.post(AUTH_END_POINTS.OTP, otpValidator, authController.verifyOtp);
router.post(
  AUTH_END_POINTS.RESEND_OTP,
  resendOtpValidator,
  authController.resendOtp
);
router.post(AUTH_END_POINTS.LOGIN, loginValidator, authController.login);
router.post(AUTH_END_POINTS.REFRESH_TOKEN, refreshController.handle);
router.post(AUTH_END_POINTS.LOGOUT, authController.logout);

//admin auth routes
router.post(
  AUTH_END_POINTS.ADMIN_LOGIN,
  loginValidator,
  adminAuthController.login
);
router.post(
  AUTH_END_POINTS.ADMIN_GOOGOLE_LOGIN,
  googeLoginValidator,
  adminGoogleAuthController.handle
);

//forgot password
router.post(
  AUTH_END_POINTS.FORGOT_PASSWORD,
  forgotPasswordValidator,
  forgotPasswordController.handle
);
router.post(
  AUTH_END_POINTS.RESET_PASSWORD,
  resetPasswordValidator,
  resetPasswordController.handle
);

//change password
router.post(
  AUTH_END_POINTS.CHANGE_PASSWORD,
  changePasswordValidator,
  authValidator(tokenService),
  changePasswordController.changePassword
);

//google auth
router.post(
  AUTH_END_POINTS.GOOGLE_LOGIN,
  googeLoginValidator,
  googleLoginController.handle
);

export default router;
