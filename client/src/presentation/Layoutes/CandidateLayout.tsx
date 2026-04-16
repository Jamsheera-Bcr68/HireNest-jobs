import { useState, useEffect } from 'react';
import { SideBar } from '../components/candidate/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../components/common/Header';

const menuItems = [
  { label: 'Dashboard', path: '/candidate/dashboard' },
  { label: 'Saved Jobs', path: '/candidate/jobs' },
  { label: 'Profile', path: '/candidate/profile' },
];

export const CandidateLayout = () => {
  const [isSidebarOpen, setsidebarOpen] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;

  const activeItem = menuItems.find((item) =>
    currentPath.startsWith(item.path)
  );
  console.log('curentpath,activeitem', currentPath, activeItem);

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
  const [title, seTitle] = useState(activeItem?.label ?? 'Dashboard');
  return (
    <>
      {/* <div className="flex min-h-screen "> */}
      <div
        className={`flex-1 h-screen bg-gray-100 ${isSidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}
      >
        <SideBar
          isOpen={isSidebarOpen}
          setOpen={setsidebarOpen}
          setTitle={seTitle}
          nav={title}
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
