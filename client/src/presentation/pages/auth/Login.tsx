import LoginForm from '../../components/auth/LoginForm';
import { Button } from '../../components/common/Button';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <LoginForm role="user" />
        <Button />
      </div>
    </div>
  );
};

export default Login;
