import { useResetPassword } from '../../hooks/auth/useResetPassword';
import { useToast } from '../../../shared/toast/useToast';
import { Eye, EyeClosedIcon } from 'lucide-react';

const ResetPasswordForm = () => {
  const { showToast, ToastElement } = useToast();
  const {
    formData,
    handleChange,
    submitHandle,
    error,
    setShowPassword,
    showPassword,
  } = useResetPassword(showToast);
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Reset Your Password
        </h2>
        {error?.server ? (
          <p className="text-sm  text-red-500 text-center mb-2">
            {error.server}
          </p>
        ) : (
          ''
        )}
        {error?.email ? (
          <p className="text-sm  text-red-500 text-center mb-2">
            {error.email}
          </p>
        ) : (
          ''
        )}
        {error?.resetToken ? (
          <p className="text-sm  text-red-500 text-center mb-2">
            {error.resetToken}
          </p>
        ) : (
          ''
        )}
        <p className="text-sm text-gray-600 text-center mb-6"></p>
        <p className=" text-sm font-medium text-red-500 mb-1 text-center"></p>
        <form onSubmit={submitHandle} className="space-y-4">
          <div>
            <div className="relative">
              <input
                value={formData.password}
                onChange={handleChange}
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Your Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword((state) => !state)}
              >
                {showPassword ? <Eye size={18} /> : <EyeClosedIcon size={18} />}
              </button>
            </div>

            {error?.password ? (
              <p className="text-sm  text-red-600 mb-2">* {error.password}</p>
            ) : (
              ''
            )}
          </div>

          <div>
            <input
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error?.confirm_password ? (
              <p className="text-sm  text-red-600 mb-2">
                * {error.confirm_password}
              </p>
            ) : (
              ''
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg
                     hover:bg-blue-700 transition duration-200"
          >
            Reset
          </button>
        </form>
        <div className="text-center mt-6">
          <a href="/login" className="text-sm text-blue-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
      {ToastElement}
    </div>
  );
};

export default ResetPasswordForm;
