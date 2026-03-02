import { useRegister } from '../../hooks/auth/useRegister';
import { useToast } from '../../../shared/toast/useToast';
import { Eye, EyeClosedIcon } from 'lucide-react';

function RegisterForm() {
  const { showToast, ToastElement } = useToast();
  const {
    formData,
    succesMsg,
    errors,
    handleChange,
    submitHandle,
    showPassword,
    setShowPassword,
  } = useRegister(showToast);

  return (
    <>
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Account
        </h1>
        <p className="text-gray-600">Join us today and get started</p>

        {errors.server && (
          <p className="text-red-500 text-sm mt-1">{errors.server}</p>
        )}
        {succesMsg && (
          <p className="text-green-500 text-sm mt-1">{succesMsg}</p>
        )}
      </div>

      <div className="space-y-4">
        <button
          type="button"
          className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Sign up with Google</span>
        </button>

        {/* Email */}
        <input
          value={formData.email}
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}

        {/* Phone */}
        <input
          value={formData.phone}
          onChange={handleChange}
          name="phone"
          type="tel"
          placeholder="Phone number"
          className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}

        {/* Password */}
        <div className="relative">
          <input
            value={formData.password}
            onChange={handleChange}
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full  px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
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

        {/* Confirm Password */}
        <div className="relative">
          <input
            value={formData.confirm_password}
            onChange={handleChange}
            name="confirm_password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />{' '}
        </div>

        {errors.confirm_password && (
          <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>
        )}

        {/* Submit */}
        <button
          onClick={submitHandle}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
        >
          Sign Up
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <a
          href="/login"
          className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
        >
          Sign in
        </a>
      </p>
      {ToastElement}
    </>
  );
}

export default RegisterForm;
