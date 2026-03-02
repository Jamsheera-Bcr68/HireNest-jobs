import express from 'express';
import {
  otpValidator,
  registerValidator,
  resendOtpValidator,
} from '../middleweres/validatores/registerValidator';
import {
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  googeLoginValidator,
} from '../middleweres/validatores/loginValidator';
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
import { changePasswordValidator } from '../middleweres/validatores/passwordValidator';
import { authValidator } from '../middleweres/authValidator';
import { tokenService } from '../../../infrastructure/config/di';

const router = express.Router();

router.post('/register', registerValidator, authController.register);
router.post('/otp', otpValidator, authController.verifyOtp);
router.post('/resend-otp', resendOtpValidator, authController.resendOtp);
router.post('/login', loginValidator, authController.login);
router.post('/refresh-token', refreshController.handle);
router.post('/logout', authController.logout);

//admin auth routes
router.post('/admin/login', loginValidator, adminAuthController.login);
router.post(
  '/admin/google',
  googeLoginValidator,
  adminGoogleAuthController.handle
);

//forgot password
router.post(
  '/forgot-password',
  forgotPasswordValidator,
  forgotPasswordController.handle
);
router.post(
  '/reset-password',
  resetPasswordValidator,
  resetPasswordController.handle
);

//change password
router.post(
  '/changePassword',
  changePasswordValidator,
  authValidator(tokenService),
  changePasswordController.changePassword
);

//google auth
router.post('/google', googeLoginValidator, googleLoginController.handle);

export default router;
