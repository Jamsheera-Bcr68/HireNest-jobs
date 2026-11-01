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
    loading,
  } = useLogin(role);

  // return (
  //   <form onSubmit={submitHandle} className="rounded-md">
  //     <div className="text-center  mb-5"></div>
  //     <AuthForms title="Login" error={errors.server} />

  //     <div className="space-y-4">
  //       <button
  //         onClick={() => handleGoogleSignIn()}
  //         type="button"
  //         className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow"
  //       >
  //         <img
  //           src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
  //           alt="Google"
  //           className="w-5 h-5"
  //         />
  //         <span>Login with Google</span>
  //       </button>
  //       <p className="text-center">Or</p>
  //       {/* Email */}
  //       <div>
  //         <input
  //           value={formData.email}
  //           onChange={handleChange}
  //           name="email"
  //           type="email"
  //           placeholder="Email address"
  //           className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition"
  //         />
  //       </div>
  //       {errors.email && (
  //         <p className="text-red-500 text-xs mt-1">{errors.email}</p>
  //       )}
  //       {/* Password */}
  //       <div className="relative">
  //         <input
  //           value={formData.password}
  //           onChange={handleChange}
  //           name="password"
  //           type={showPassword ? 'text' : 'password'}
  //           placeholder="Password"
  //           className="w-full  px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition"
  //         />{' '}
  //         <button
  //           type="button"
  //           className="absolute inset-y-0 right-3 flex items-center text-gray-500"
  //           onClick={() => setShowPassword((state) => !state)}
  //         >
  //           {showPassword ? <Eye size={18} /> : <EyeClosedIcon size={18} />}
  //         </button>
  //       </div>

  //       {errors.password && (
  //         <p className="text-red-500 text-xs mt-1">{errors.password}</p>
  //       )}
  //       {/* Submit */}
  //       <button
  //         type="submit"
  //         disabled={loading}
  //         className={`w-full text-white py-2.5 rounded-lg text-sm font-semibold
  //   transition duration-200 shadow-md
  //   ${
  //     loading
  //       ? 'bg-fuchsia-500 cursor-not-allowed opacity-80'
  //       : 'bg-fuchsia-800 hover:bg-fuchsia-700 hover:shadow-lg'
  //   }`}
  //       >
  //         {loading ? 'Logging in...' : 'Login'}
  //       </button>
  //     </div>
  //     <div className="w-full ">
  //       <button
  //         color="white"
  //         onClick={handleForgotPassword}
  //         className="ml-60 text-sm text-fuchsia-800 hover:text-fuchsia-500 transition"
  //       >
  //         Forgot Password ?
  //       </button>
  //     </div>
  //     {role !== 'admin' ? (
  //       <p className="text-center text-sm text-gray-600 mt-6">
  //         Don't have an account?{' '}
  //         <a
  //           href="/register"
  //           className="text-fuchsia-800 font-semibold hover:text-fuchsia-600 transition"
  //         >
  //           Create
  //         </a>
  //       </p>
  //     ) : (
  //       ''
  //     )}
  //   </form>
  // );

  return (
    <form onSubmit={submitHandle} className="w-full rounded-md">
      <AuthForms title="Login" error={errors.server} />

      <div className="space-y-4">
        <button
          onClick={() => handleGoogleSignIn()}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition duration-200 hover:bg-gray-50 hover:shadow sm:text-base"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt=""
            className="h-5 w-5 shrink-0"
          />
          <span>Login with Google</span>
        </button>

        <p className="text-center text-sm text-gray-500">Or</p>

        {/* Email */}
        <div>
          <input
            value={formData.email}
            onChange={handleChange}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base outline-none transition focus:border-transparent focus:ring-2 focus:ring-fuchsia-500 sm:text-sm"
          />
          {errors.email && (
            <p className="mt-1 break-words text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <input
              value={formData.password}
              onChange={handleChange}
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-4 pr-11 text-base outline-none transition focus:border-transparent focus:ring-2 focus:ring-fuchsia-500 sm:text-sm"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-gray-500"
              onClick={() => setShowPassword((state) => !state)}
            >
              {showPassword ? <Eye size={18} /> : <EyeClosedIcon size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 break-words text-xs text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-lg py-2.5 text-sm font-semibold text-white shadow-md transition duration-200
          ${
            loading
              ? 'cursor-not-allowed bg-fuchsia-500 opacity-80'
              : 'bg-fuchsia-800 hover:bg-fuchsia-700 hover:shadow-lg'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={handleForgotPassword}
          className="py-1 text-sm text-fuchsia-800 transition hover:text-fuchsia-500"
        >
          Forgot Password ?
        </button>
      </div>

      {role !== 'admin' ? (
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a
            href="/register"
            className="font-semibold text-fuchsia-800 transition hover:text-fuchsia-600"
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
