import { useSearchParams } from 'react-router-dom';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import type { UserRole } from '../../../constants/types/user';

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as UserRole;
  return (
    <div>
      <ForgotPasswordForm role={role} />
    </div>
  );
};

export default ForgotPassword;
