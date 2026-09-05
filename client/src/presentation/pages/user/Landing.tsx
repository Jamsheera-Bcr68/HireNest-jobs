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


import Footer from '../../components/common/Footer';
import { candidateService } from '../../../services/api-services/candidateService';
import { useToast } from '../../../shared/toast/use-toast';
import { useEffect, useState } from 'react';
import { type HomeResponseDto } from '../../../types/dtos/home-response.dto';
import { industryIcons } from '../../../types/dtos/profile-types/industry.type';
import { type JobFilterType } from '../../components/candidate/jobListing/ListingContainter';
import { Hirenest } from '../../components/candidate/landing/Sections';

import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../redux/store';

const Landing = () => {
  const navigate = useNavigate();
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

  const stats = homeData?.industries.map((item) => {
    //console.log('items', item);
    return {
      icon: industryIcons[item.industry],
      label: item.industry,
      count: item.count.toLocaleString(),
    };
  });

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

  return (
    <div className="relative">
      {/* HERO BACKGROUND */}

      {/* HERO BACKGROUND */}
      <div className="absolute inset-x-0 top-0 h-[650px] md:h-[750px] lg:h-[800px] -z-10">
        <div className="hero-glow absolute inset-0" />
      </div>

      {/* HEADER */}
      <Header />

      {/* HERO */}
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
      <Footer />
    </div>
  );

  {
    /* // return (
  //   <>
      
  //     <HeroHome
  //       filter={filter}
  //       handleFilterChange={handleFilterChange}
  //       jobCountOfToday={homeData?.currentDayPostCount || 0}
  //     />
  //     {/* <div className="min-h-screen bg-gray-100">
  //       <Status stats={homeData?.stats || []} />
  //       <Industries updateFilter={handleFilterChange} stats={stats || []} />
  //       <FeaturedJobs featuredJobs={homeData?.featuredJobs || []} />
  //       <ForEmployers />
  //       <Working />
  //       <Footer />
  //     </div> */
  }
  //     <Hirenest />
  //     <Features />
  //     <ForCandidates user={user} role={user?.role} />
  //     <ForEmployers user={user} />
  //     <Working />
  //     <Properties/>
  //     <HighLights/>
  //     <Footer/>

  //   </>
  // );
};
export default Landing;
