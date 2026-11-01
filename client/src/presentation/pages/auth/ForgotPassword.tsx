import { useSearchParams } from 'react-router-dom';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import type { UserRole } from '../../../constants/types/user';

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as UserRole;
  return (
    <div className="min-h-screen bg-[url('/signupBg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <ForgotPasswordForm role={role} />
      </div>
    </div>
    // <div>
    //   <ForgotPasswordForm role={role} />
    // </div>
  );
};

export default ForgotPassword;
