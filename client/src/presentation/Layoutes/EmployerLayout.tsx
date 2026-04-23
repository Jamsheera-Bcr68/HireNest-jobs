import { useState, useEffect } from 'react';
import { SideBar } from '../components/user/employer/SideBar';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '../components/user/employer/home/Header';

const menuItems = [
  { label: 'Dashboard', path: '/company/dashboard' },
  { label: 'Create Job', path: '/company/jobs/create' },
  { label: 'My Jobs', path: '/company/jobs' },
  { label: 'Profile', path: '/company/profile' },
  { label: 'Skill Requests', path: '/company/skills' },
  { label: 'Applications', path: '/company/applications' },
];
export const EmployerLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const activeItem = menuItems.find((item) =>
    currentPath.startsWith(item.path)
  );
  console.log('currentPath,activeItem', currentPath, activeItem);

  const [isSidebarOpen, setsidebarOpen] = useState(true);
  const [title, seTitle] = useState(activeItem || 'Dashboard');
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
          nav={`${activeItem?.label || 'Dashboard'}`}
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
