import { useSelector } from 'react-redux';
import HomeConatiner from '../../components/common/home/HomeConatiner';
import type { RootState } from '../../../redux/store';
import EmployerHome from './employer/Home';

function Home() {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log('usr is  home ',user);
  
  return <> {user.role == 'company' ? <EmployerHome /> : <HomeConatiner />}</>;
}

export default Home;
