import { Navigate, Outlet } from 'react-router-dom';
import type { StateType } from '../constants/types/user';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function PublicRoutes() {
  const location = useLocation();
  const { user, isAuthenticated } = useSelector(
    (state: StateType) => state.auth
  );

  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    const redirectPath = location.state?.from ?? '/';
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
