import Header from '../../components/common/Header';
import { useSelector } from 'react-redux';
import {
  Features,
  ForCandidates,
  ForEmployers,
  Working,
  Properties,
  HighLights,
} from '../../components/candidate/landing/Sections';
import HeroHome from '../../components/candidate/landing/Hero';
import { BottomNav } from '../../components/common/Footer';

import Footer from '../../components/common/Footer';
import { candidateService } from '../../../services/api-services/candidateService';
import { useToast } from '../../../shared/toast/use-toast';
import { useEffect, useState } from 'react';
import { type HomeResponseDto } from '../../../types/dtos/home-response.dto';

import { type JobFilterType } from '../../components/candidate/jobListing/ListingContainter';
import { Hirenest } from '../../components/candidate/landing/Sections';

import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../redux/store';
import { BriefcaseBusiness, Building2, Info, Users } from 'lucide-react';

export const NAV_LINKS = [
  { href: '#what', label: 'About', icon: Info },
  { href: '#features', label: 'Services', icon: BriefcaseBusiness },
  { href: '#candidates', label: 'For Candidates', icon: Users },
  { href: '#employers', label: 'For Employers', icon: Building2 },
];

const Landing = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>('');

  const [filter, setFilter] = useState<JobFilterType>({
    search: {
      job: '',
      location: '',
    },
    industry: [],
  });
  const user = useSelector((state: RootState) => state.auth.user);
  const { showToast } = useToast();
  // console.log('from home page', user);
  const [homeData, setHomeData] = useState<HomeResponseDto | null>(null);
  useEffect(() => {
    async function getHomeData() {
      try {
        const data = await candidateService.getHomeData();
        setHomeData(data.data);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    }
    getHomeData();
  }, []);

  const handleFilterChange = async (value: Partial<JobFilterType>) => {
    // console.log('value:', value);

    const updatedFilter = {
      ...filter,
      ...value,
      search: {
        ...filter.search,
        ...value.search,
      },
    };

    setFilter(updatedFilter);
    //console.log('updated filter', updatedFilter);
    // console.log('industry', updatedFilter.industry);

    navigate(
      `/jobs?job=${updatedFilter.search.job}&location=${updatedFilter.search.location}&industry=${updatedFilter.industry}`
    );
  };

  // return (
  //   <div className="relative">
  //     {/* HERO BACKGROUND */}
  //     <div className="absolute inset-x-0 top-0 h-[650px] md:h-[750px] lg:h-[800px] -z-10">
  //       <div className="hero-glow absolute inset-0" />
  //     </div>

  //     <Header />

  //     <HeroHome
  //       filter={filter}
  //       handleFilterChange={handleFilterChange}
  //       jobCountOfToday={homeData?.currentDayPostCount || 0}
  //     />

  //     <Hirenest />
  //     <Features />
  //     <ForCandidates user={user} role={user?.role} />
  //     <ForEmployers user={user} />
  //     <Working />
  //     <Properties />
  //     <HighLights />
  //     <BottomNav />
  //     <Footer />
  //   </div>
  // );
  return (
    <div className="relative isolate flex min-h-screen w-full flex-col overflow-x-clip pb-16 md:pb-0">
      {/* HERO BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10
    bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.25),transparent_70%)]"
      >
        <div className="hero-glow absolute inset-0" />
      </div>

      <Header active={active} setActive={setActive} />

      <main className="flex-1">
        <HeroHome
          filter={filter}
          handleFilterChange={handleFilterChange}
          jobCountOfToday={homeData?.currentDayPostCount || 0}
        />

        <Hirenest />
        <Features />
        <ForCandidates user={user} role={user?.role} />
        <ForEmployers user={user} />
        <Working />
        <Properties />
        <HighLights />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};
export default Landing;
