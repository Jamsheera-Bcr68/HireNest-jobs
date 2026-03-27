import Header from '../../components/common/Header';
import { useSelector } from 'react-redux';
import HeroHome from '../../components/candidate/home/Hero';
import Status from '../../components/candidate/home/Status';
import Industries from '../../components/candidate/home/Industries';
import FeaturedJobs from '../../components/candidate/home/FeaturedJobs';
import ForEmployers from '../../components/candidate/home/ForEmployers';
import Working from '../../components/candidate/home/Working';
import Footer from '../../components/common/Footer';
import { candidateService } from '../../../services/apiServices/candidateService';
import { useToast } from '../../../shared/toast/useToast';
import { useEffect, useState } from 'react';
import { type HomeResponseDto } from '../../../types/dtos/HomeResponseDto';
import { industryIcons } from '../../../types/dtos/profileTypes/industryType';
import { type JobFilterType } from './JobListing';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<JobFilterType>({
    search: {
      job: '',
      location: '',
    },
    industry: [],
  });
  const user = useSelector((state: any) => state.auth.user);
  const { showToast } = useToast();
  console.log('from home page', user);
  const [homeData, setHomeData] = useState<HomeResponseDto | null>(null);
  useEffect(() => {
    async function getHomeData() {
      try {
        const data = await candidateService.getHomeData();
        setHomeData(data.data);
        console.log('after gettinhg home data', data);
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
    console.log('items', item);
    return {
      icon: industryIcons[item.industry],
      label: item.industry,
      count: item.count.toLocaleString(),
    };
  });

  const handleFilterChange = async (value: Partial<JobFilterType>) => {
    console.log('value:', value);

    const updatedFilter = {
      ...filter,
      ...value,
      search: {
        ...filter.search,
        ...value.search,
      },
    };

    setFilter(updatedFilter);
    console.log('updated filter', updatedFilter);
    console.log('industry', updatedFilter.industry);

    navigate(
      `/jobs?job=${updatedFilter.search.job}&location=${updatedFilter.search.location}&industry=${updatedFilter.industry}`
    );
  };

  return (
    <>
      <Header />
      <HeroHome
        filter={filter}
        handleFilterChange={handleFilterChange}
        jobCountOfToday={homeData?.currentDayPostCount || 0}
      />
      <div className="min-h-screen bg-gray-100">
        <Status stats={homeData?.stats || []} />
        <Industries updateFilter={handleFilterChange} stats={stats || []} />
        <FeaturedJobs featuredJobs={homeData?.featuredJobs || []} />
        <ForEmployers />
        <Working />
        <Footer />
      </div>
    </>
  );
};
export default Home;
