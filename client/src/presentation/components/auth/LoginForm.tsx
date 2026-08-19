import { useLogin } from '../../hooks/auth/useLogin';
import type { ILoginFormProps } from '../../../constants/interfaces/auth';

import { Eye, EyeClosedIcon } from 'lucide-react';
import AuthForms from './AuthForms';

const LoginForm = ({ role }: ILoginFormProps) => {
  const {
    handleChange,
    handleForgotPassword,
    errors,
    formData,
    submitHandle,
    handleGoogleSignIn,
    showPassword,
    setShowPassword,
  } = useLogin(role);

  return (
    <form onSubmit={submitHandle} className="rounded-md">
      <div className="text-center  mb-5">
      
      </div>
      <AuthForms title='Login'  error={errors.server}/>

      <div className="space-y-4">
        <button
          onClick={() => handleGoogleSignIn()}
          type="button"
          className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Login with Google</span>
        </button>
        <p className="text-center">Or</p>
        {/* Email */}
        <div>
          <input
            value={formData.email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
        {/* Password */}
        <div className="relative">
          <input
            value={formData.password}
            onChange={handleChange}
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full  px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition"
          />{' '}
          <button
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowPassword((state) => !state)}
          >
            {showPassword ? <Eye size={18} /> : <EyeClosedIcon size={18} />}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
        {/* Submit */}
        <button
          type='submit'
          className="w-full bg-fuchsia-800 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-fuchsia-700 transition duration-200 shadow-md hover:shadow-lg"
        >
          Login
        </button>
      </div>
      <div className="w-full ">
        <button color='white'
          onClick={handleForgotPassword}
          className="ml-60 text-sm text-fuchsia-800 hover:text-fuchsia-500 transition"
        >
          Forgot Password ?
        </button>
      </div>
      {role !== 'admin' ? (
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <a
            href="/register"
            className="text-fuchsia-800 font-semibold hover:text-fuchsia-600 transition"
          >
            Create
          </a>
        </p>
      ) : (
        ''
      )}
    </form>
  );
};

export default LoginForm;
