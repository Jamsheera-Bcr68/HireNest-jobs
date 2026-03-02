import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../libraries/axios';
import { type typeOfToast } from '../../../types/toastTypes';

export function useOtp(showToast: (toast: typeOfToast) => void) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const otprefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  console.log('time ref ', timerRef);

  const setTimer = (expiredAt: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const updateTimer = () => {
      let secondsLeft = Math.max(
        Math.floor((expiredAt - Date.now()) / 1000),
        0
      );
      console.log('timeLeft ', timeLeft);

      setTimeLeft(secondsLeft);
    };
    updateTimer();
    timerRef.current = setInterval(updateTimer, 1000);
  };
  useEffect(() => {
    const expired_str = sessionStorage.getItem('otp_expiredAt');
    if (!expired_str) {
      setError('expiry unavailable');
      return;
    }
    const expiredAt = new Date(expired_str).getTime();
    console.log(
      'expiredAt - Date.now(),differnece is ',
      expiredAt,
      Date.now(),
      Math.floor(expiredAt - Date.now()) / 1000
    );

    setTimer(expiredAt);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    if (!/^\d?$/.test(value)) return;
    console.log('otprefs', otprefs);

    const index: number = Number(e.currentTarget.dataset.index);
    console.log(`type of index ${typeof index}`);

    console.log('key,value', index, value);

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    console.log(
      `from handle change otp ${newOtp} length is ${otprefs.current.length}`
    );
    if (value && index < 5) {
      otprefs.current[index + 1]?.focus();
      console.log('curesor is now in ', index + 1, 'tthe positoin ');
    }
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    console.log('from handle key doun');

    const index = Number(e.currentTarget.dataset.index);
    if (e.key === 'Backspace') {
      console.log('key is back space');
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        otprefs.current[index - 1]?.focus();
      }
    }
  }
  async function handleResend(): Promise<void> {
    console.log('from resend otp');
    setOtp(['', '', '', '', '', '']);
    const email = sessionStorage.getItem('otp_email');
    console.log('email', email);

    try {
      const response = await axios.post('/auth/resend-otp', { email: email });
      console.log('response after resend otp', response);
      setError('');
      sessionStorage.setItem('otp_expiredAt', response.data.otp_expiry);
      console.log('expired at ', response.data.otp_expiry);

      showToast({ msg: response.data.message, type: 'success' });

      const expiredAt = new Date(response.data.otp_expiry).getTime();
      setTimer(expiredAt);
      setError('');
    } catch (err: any) {
      console.log(err);

      showToast({
        msg: err.response?.data.message || err.message,
        type: 'error',
      });
    }
  }
  async function submitOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const finalOtp = otp.join('');
    if (!finalOtp) {
      setError('Please enter your OTP');
      return;
    } else if (finalOtp.length < 6) {
      setError('Please enter your OTP currectly');
      console.log('"Please enter your OTP currectly"');

      return;
    }
    setError('');
    console.log('otp submitted ', finalOtp);
    const email = sessionStorage.getItem('otp_email');
    if (!email) {
      navigate('/register');
      return null;
    }
    try {
      let response = await axios.post('/auth/otp', { otp: finalOtp, email });
      console.log('response from the server', response);
      showToast({ msg: response.data.message, type: 'success' });
      navigate('/login');
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
      showToast({ msg: error.response.data.message, type: 'error' });
    }
  }
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${mins}: ${sec.toString().padStart(2, '0')} `;
  };
  return {
    otp,
    handleChange,
    otprefs,
    error,
    submitOtp,
    handleKeyDown,
    handleResend,
    timeLeft,
    formatTime,
  };
}
