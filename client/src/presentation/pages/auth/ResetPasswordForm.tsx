import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-[url('/signupBg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
