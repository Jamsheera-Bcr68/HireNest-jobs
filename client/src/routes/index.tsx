import { Route, Routes } from 'react-router-dom';
import MeetPage from '../presentation/pages/user/MeetPage';

import ProtectedRoutes from './PrivateRoutes';
import { CandidateRoutes } from './user.routes/candidate.route';

import NotFound from '../presentation/pages/NotFound';
import Home from '../presentation/pages/user/Home';
import PublicRoutes from './PublicOnlyRoutes';
import Login from '../presentation/pages/auth/Login';
import Register from '../presentation/pages/auth/Register';
import Otp from '../presentation/pages/auth/Otp';
import AdminLogin from '../presentation/pages/auth/AdminLogin';

import ForgotPassword from '../presentation/pages/auth/ForgotPassword';
import ResetPassword from '../presentation/pages/auth/ResetPasswordForm';
import { CompanyRoutes } from './user.routes/company.routes';
import { AdminRoutes } from './admin.routes';
import { AdminProtectedRoute } from './PrivateRoutes';
import JobListing from '../presentation/pages/user/JobListing';
import JobDetailsPage from '../presentation/components/candidate/jobListing/JobDetailsWrapper';
import InterviewRoom from '../presentation/InterviewRoom';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<JobListing />} />
      <Route path="/jobs/:id" element={<JobDetailsPage />} />

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
        <Route path="/candidate/*" element={<CandidateRoutes />} />

        <Route path="/company/*" element={<CompanyRoutes />} />
      </Route>

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>
        <Route path="/meeting/:meetId" element={<MeetPage />} />
        <Route path="/meet" element={<InterviewRoom canndidateName='Jams' roleTitle='role title' interviewerName='Interviewer'  onEndCall={()=>{}} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
