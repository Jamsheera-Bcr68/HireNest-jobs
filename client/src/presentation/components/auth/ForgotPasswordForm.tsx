import { useForgotPassword } from '../../hooks/auth/useForgotPassword';
import type { ILoginFormProps } from '../../../constants/interfaces/auth';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = ({ role }: ILoginFormProps) => {
  const navigate = useNavigate();
  const { email, handleChange, submitHandle, error } = useForgotPassword(role);
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>
        {error && (
          <p className=" text-sm font-medium text-red-500 mb-1 text-center">
            {error}
          </p>
        )}
        <form className="space-y-4" onSubmit={submitHandle}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              value={email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg
                     hover:bg-blue-700 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
