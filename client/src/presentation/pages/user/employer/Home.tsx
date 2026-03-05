import { Header } from '../../../components/user/employer/home/Header';
import HeroSection from '../../../components/user/employer/home/HeroSection';
import ServicesSection from '../../../components/user/employer/home/Service';
//import TestimonialsSection from './Testimonial';
//import Steps from './Steps';
import Footer from '../../../components/common/Footer';

function EmployerHome() {
  return (
    <div className=" ">
      <Header />
      <HeroSection heroImage={'/emp_landing.jpg'} />
      <ServicesSection />
      {/* <Steps />
      <TestimonialsSection/> */}
      <Footer />
    </div>
  );
}

export default EmployerHome;
