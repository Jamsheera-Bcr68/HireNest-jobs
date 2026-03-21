import LoginForm from '../../components/auth/LoginForm';

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-[url('/signupBg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <LoginForm role="admin" />
      </div>
    </div>
  );
};

export default AdminLogin;
