import LoginForm from '../../components/auth/LoginForm';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[url('/loginBg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grey/30 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <LoginForm role="candidate" />
        <div className="flex justify-center mt-4">
          <Button variant="info" onClick={() => navigate('/')}>
            Back To Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
