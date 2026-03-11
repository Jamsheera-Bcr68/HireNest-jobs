import { useNavigate } from 'react-router-dom';
import { Button } from '../../../common/Button';
import { useSelector } from 'react-redux';
import type { StateType } from '../../../../../constants/types/user';

import CompanyRegistrationPendingModal from '../../../../modals/CompanyRegistrationPendingModal';
import ModalLayout from '../../../../Layoutes/ModalLayout';
import { useState } from 'react';
type HeroProps = {
  heroImage: string;
};

const HeroSection = ({ heroImage }: HeroProps) => {
  const user = useSelector((state: StateType) => state.auth.user);
  console.log(heroImage);
  const [pendingOpen, setPendingOpen] = useState(false);
  const [infoOpen, setinfoOpen] = useState(false);
  const navigate = useNavigate();
  const handlePostClick = () => {
    console.log('from handle post click');
    if (user.role == 'employer') {
      navigate('/company/jobs/create');
    } else if (user.role == 'candidate' && user.isRequested) {
      setPendingOpen(true);
    } else {
      setinfoOpen(true);
    }
  };
  const handleDashboardClick = () => {
    console.log('from handle post click');
    if (user.role == 'employer') {
      navigate('/company/dashboard');
    } else if (user.role == 'candidate' && user.isRequested) {
      setPendingOpen(true);
    } else {
      setinfoOpen(true);
    }
  };
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/emp_landing.jpg"
          alt="Team collaborating"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-blue-500/30 " />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block rounded-full px-4 py-1.5 text-sm bg-white/20 text-teal-400 font-medium">
            🚀 #1 Hiring Platform for Employers
          </span>
          <h1 className="text-3xl text-white font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Find the Right Talent, <span className="text-teal-600">Faster</span>
          </h1>
          <p className="mt-6 text-lg text-white leading-relaxed text-primary-foreground/80 sm:text-xl">
            Post jobs, review candidates, and hire top professionals — all in
            one powerful platform built for modern employers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {/* <Button  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-8 text-base font-semibold"> */}
            <Button
              onClick={handlePostClick}
              variant="info"
              color="white"
              size="lg"
            >
              Post a Job
            </Button>
            <Button
              onClick={handleDashboardClick}
              variant="info"
              color="white"
              size="lg"
            >
              Go To dashboard
            </Button>
          </div>
          <div className="mt-10 flex text-white items-center gap-6 text-sm text-white-foreground/70">
            <span>✓ No credit card required</span>
            <span>✓ Free forever plan </span>
            <span className="hidden sm:inline">✓ 10k+ companies trust us</span>
          </div>
        </div>
      </div>
      <ModalLayout open={pendingOpen} onClose={() => setPendingOpen(false)}>
        <CompanyRegistrationPendingModal
          type={'pending'}
          message={`Your company profile is currently under review.  
          Our admin team will verify your details and approve your employer
          account within  `}
          title="Your profile under review"
          onClose={() => setPendingOpen(false)}
        />
      </ModalLayout>
      <ModalLayout open={infoOpen} onClose={() => setinfoOpen(false)}>
        <CompanyRegistrationPendingModal
          title="Register your company"
          type={'new'}
          message={`You does not have a active company for posting a job,Please rregister your company `}
          onClose={() => setinfoOpen(false)}
        />
      </ModalLayout>
    </section>
  );
};

export default HeroSection;
