import { Route, Routes } from 'react-router-dom';
import Register from '../presentation/pages/auth/Register.tsx';
import Loginfile from '../presentation/pages/auth/Login.tsx';
import Home from '../presentation/pages/user/Home.tsx';
import Otp from '../presentation/pages/auth/Otp.tsx';
import AdminLogin from '../presentation/pages/auth/AdminLogin.tsx';
import Dashboard from '../presentation/pages/admin/Dashboard.tsx';
import ForgotPassword from '../presentation/pages/auth/ForgotPassword.tsx';
import ResetPassword from '../presentation/pages/auth/ResetPasswordForm.tsx';
import PublicRoutes from './PublicOnlyRoutes.tsx';

export const AuthRoutes = () => {
  return (
    <>
      <Route index element={<Home />} />
      <Route element={<PublicRoutes />}>
        <Route path="register" element={<Register />} />
        <Route path="otp" element={<Otp />} />
        <Route path="login" element={<Loginfile />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      </Route>
    </>
  );
};
