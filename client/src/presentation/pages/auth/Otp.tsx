import { useOtp } from '../../hooks/auth/useOtp';
import { useToast } from '../../../shared/toast/useToast';

const Otp: React.FC = () => {
  const { showToast, ToastElement } = useToast();
  const {
    otp,
    handleChange,
    otprefs,
    submitOtp,
    error,
    handleKeyDown,
    handleResend,
    timeLeft,
    formatTime,
  } = useOtp(showToast);

  const isExpired = false;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* <form  onSubmit={submitOtp}> */}
      <form
        onSubmit={submitOtp}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Verify OTP
        </h1>
        {!error && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Enter the 6-digit code sent to your email
          </p>
        )}
        {error && (
          <p className="text-sm text-red-500 text-center mt-2">{error}</p>
        )}

        {/* OTP Inputs */}
        <div className="flex justify-between mt-6">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <input
              ref={(el) => {
                otprefs.current[index] = el;
              }}
              key={index}
              type="text"
              data-index={index}
              maxLength={1}
              value={otp[index] ?? ''}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          {!isExpired ? (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-1.5  ">
                {timeLeft !== 0 ? (
                  <span className="text-sm text-yellow-700">
                    OTP expires in
                  </span>
                ) : (
                  <span className="text-sm text-red-700">OTP Expired</span>
                )}
              </div>{' '}
              <br />
              <div className="inline-flex items-center gap-2 px-4 py-1.0 rounded-lg bg-blue-50 border border-blue-200">
                <span className="text-sm font-semibold text-blue-500 tabular-nums">
                  {/* {formatTime(timeLeft)} */}
                  {formatTime(timeLeft)}
                </span>
              </div>
            </>
          ) : (
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-50 border border-red-200">
              <span className="text-sm font-semibold text-red-600"></span>
            </div>
          )}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          className={`w-full mt-6 py-2 rounded-lg text-white  ${timeLeft !== 0 ? 'bg-blue-600  hover:bg-blue-700 transition' : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
        >
          Verify OTP
        </button>

        {/* Resend */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn’t receive the code?{' '}
          <span
            onClick={handleResend}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Resend
          </span>
        </p>
      </form>
      {/* </form> */}
      {ToastElement}
    </div>
  );
};

export default Otp;
