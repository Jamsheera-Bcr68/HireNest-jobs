import { Route, Routes } from 'react-router-dom';

import ProtectedRoutes from './PrivateRoutes';
import { CandidateRoutes } from './userRoutes/candidateRoute';

import NotFound from '../presentation/pages/NotFound';
import Home from '../presentation/pages/user/Home';
import PublicRoutes from './PublicOnlyRoutes';
import Login from '../presentation/pages/auth/Login';
import Register from '../presentation/pages/auth/Register';
import Otp from '../presentation/pages/auth/Otp';
import AdminLogin from '../presentation/pages/auth/AdminLogin';

import ForgotPassword from '../presentation/pages/auth/ForgotPassword';
import ResetPassword from '../presentation/pages/auth/ResetPasswordForm';
import { CompanyRoutes } from './userRoutes/companyRoutes';
import { AdminRoutes } from './adminRoutes';
import { AdminProtectedRoute } from './PrivateRoutes';


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<PublicRoutes />}>
        {' '}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/profile/*" element={<CandidateRoutes />} />
      
        <Route path="/company/*" element={<CompanyRoutes />} />
      </Route>

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
