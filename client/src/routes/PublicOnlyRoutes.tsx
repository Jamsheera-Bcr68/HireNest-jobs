import { Navigate, Outlet } from 'react-router-dom';
import type { StateType } from '../constants/types/user';
import { useSelector } from 'react-redux';

export default function PublicRoutes() {
  const { user, isAuthenticated } = useSelector(
    (state: StateType) => state.auth
  );

  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
