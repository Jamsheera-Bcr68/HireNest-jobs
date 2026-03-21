import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { StateType } from '../constants/types/user';

export default function ProtectedRoutes() {
  const { user, isAuthenticated } = useSelector(
    (state: StateType) => state.auth
  );
  console.log('isAuthenticated', isAuthenticated);

  if (!user || !isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function AdminProtectedRoute() {
  const { user, isAuthenticated } = useSelector(
    (state: StateType) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
