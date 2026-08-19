import Header from './Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './HeroHome';
import { type JobFilterType } from '../../candidate/jobListing/ListingContainter';
import type { HomeResponseDto } from '../../../../types/dtos/home-response.dto';
import { candidateService } from '../../../../services/api-services/candidateService';
import { useToast } from '../../../../shared/toast/use-toast';

function HomeConatiner() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<JobFilterType>({
    search: {
      job: '',
      location: '',
    },
    industry: [],
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

  const { showToast } = useToast();
  const [homeData, setHomeData] = useState<HomeResponseDto | null>(null);
  useEffect(() => {
    async function getHomeData() {
      try {
        const data = await candidateService.getHomeData();
        setHomeData(data.data);
        //console.log('after gettinhg home data', data);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    }
    getHomeData();
  }, []);

  return (
    <div className="relative">
      <Header />
      {/* HERO BACKGROUND */}
      <div className="absolute inset-x-0 top-0 h-[700px] -z-10">
        <img src="/homeBg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="hero-glow absolute inset-0" />
      </div>

      {/* HERO */}
      <Hero
        filter={filter}
        handleFilterChange={handleFilterChange}
        jobCountOfToday={homeData?.currentDayPostCount || 0}
      />
    </div>
  );
}

export default HomeConatiner;
