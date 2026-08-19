import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';

import type { JobFilterType } from '../jobListing/ListingContainter';
import Header from '../../common/Header';

type Props = {
  jobCountOfToday: number;
  handleFilterChange: (data: Partial<JobFilterType>) => void;
  filter: { search: { job: string; location: string } };
};
function Hero({ jobCountOfToday, handleFilterChange, filter }: Props) {
  console.log('filter formlisting', filter);

  const [jobSearch, setJobSearch] = useState<string>('');
  const [location, setLocation] = useState<string>('');

 return (
  <section className="relative min-h-screen px-6 overflow-hidden">

    {/* HERO BACKGROUND */}
    <div className="absolute inset-0 -z-10">
      <img
        src="/homeBg.jpg"
        alt=""
        className="w-full h-full object-cover"
      />

      <div className="hero-glow absolute inset-0" />
    </div>

    {/* HERO CONTENT */}
    <div className="relative max-w-4xl mx-auto text-center pt-28 md:pt-36">

      <h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 text-gray-700"
        style={{ letterSpacing: '-0.03em' }}
      >
        Find Your{' '}
        <span
          style={{
            background: 'linear-gradient(135deg,#818cf8,#c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Dream Career
        </span>{' '}
        Today
      </h1>

      <p className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
        Search thousands of jobs from top companies. Connect with the right
        opportunities and take the next step in your career journey.
      </p>

    </div>

  </section>
);
}

export default Hero;
