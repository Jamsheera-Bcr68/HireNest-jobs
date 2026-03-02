import { Navigate, Outlet } from 'react-router-dom';
import type { StateType } from '../constants/types/user';
import { useSelector } from 'react-redux';

export default function PublicRoutes() {
  const isAuthenticated = useSelector(
    (state: StateType) => state.auth.isAuthenticated
  );
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
