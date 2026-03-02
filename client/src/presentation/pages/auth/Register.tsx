import RegisterForm from '../../components/auth/RegisterForm';
import { Button } from '../../components/common/Button';

function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <RegisterForm />
        <Button />
      </div>
    </div>
  );
}

export default Register;
