import { useState, useEffect } from 'react';
import { SideBar } from '../components/candidate/Sidebar';
import { Outlet } from 'react-router-dom';

import Header from '../components/common/Header';

export const CandidateLayout = () => {
  const [isSidebarOpen, setsidebarOpen] = useState(true);
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
  const [title, seTitle] = useState('Dashboard');
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
          <div className="p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
