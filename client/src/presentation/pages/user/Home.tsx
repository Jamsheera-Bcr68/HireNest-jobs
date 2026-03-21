import Header from '../../components/common/Header';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state: any) => state.auth.user);
  console.log('from home page', user);

  return (
    <>
      <Header />
    </>
  );
};
export default Home;
