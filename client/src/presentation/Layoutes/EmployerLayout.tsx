import { useState, useEffect } from 'react';
import { SideBar } from '../components/user/employer/SideBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';
import { Header } from '../components/user/employer/home/Header';

export const EmployerLayout = () => {
  const [isSidebarOpen, setsidebarOpen] = useState(true);
  const [title, seTitle] = useState('Dashboard');
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setsidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <div className="flex min-h-screen ">
        <SideBar
          isOpen={isSidebarOpen}
          setOpen={setsidebarOpen}
          setTitle={seTitle}
        />
        <div className="flex-1  bg-gray-100">
          <Header />
          {/* <div className="h-16 z-50 bg-white sticky top-0 shadow flex items-center px-6">
            <h1 className="font-bold text-lg">My {title}</h1>
          </div> */}
          <div className="p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
