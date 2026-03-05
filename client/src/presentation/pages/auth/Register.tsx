import RegisterForm from '../../components/auth/RegisterForm';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[url('/signupBg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <RegisterForm />
        <div className="flex justify-center mt-4">
          <Button variant="info" onClick={() => navigate('/')}>
            Back To Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Register;
