import { useRegister } from '../../hooks/auth/useRegister';

import { Eye, EyeClosedIcon } from 'lucide-react';
import AuthForms from './AuthForms';

function RegisterForm() {
  const {
    formData,
    succesMsg,
    errors,
    handleChange,
    submitHandle,
    showPassword,
    setShowPassword,
  } = useRegister();

  return (
    <form onSubmit={submitHandle}>
      <AuthForms title='Create Account' error={errors.server} />
      {/* <div className="text-center mb-5"> */}
        {/* <div className="flex items-center justify-center gap-3 mb-2"> */}
          {/* HireNest Logo */}
          {/* <div className="w-10 h-10  rounded-full text-indigo-600 flex items-center justify-center shadow-sm"> */}
            {/* <img  className="w-10 h-10 rounded-full bg-indigo-600 flex items-center border-indigo-600 justify-center shadow-sm" src="6.jpg" alt="" /> */}
            {/* <span className=" font-bold text-lg">HN</span> */}
          {/* </div> */}

          {/* <h1 className="text-3xl font-bold text-gray-900">Create Account</h1> */}
        {/* </div> */}

        {/* {errors.server && (
          <p className="text-red-500 text-sm mt-1">{errors.server}</p>
        )} */}

        {/* {succesMsg && (
          <p className="text-green-500 text-sm mt-1">{succesMsg}</p>
        )} */}
      {/* </div> */}

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
          className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition"
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
          className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition"
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

        {/* Confirm Password */}
        <div className="relative">
          <input
            value={formData.confirm_password}
            onChange={handleChange}
            name="confirm_password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition"
          />{' '}
        </div>

        {errors.confirm_password && (
          <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-fuchsia-800 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-fuchsia-600 transition duration-200 shadow-md hover:shadow-lg"
        >
          Sign Up
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <a
          href="/login"
          className="text-fuchsia-800 font-semibold hover:text-fuchsia-600 transition"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}

export default RegisterForm;
