import { useState, useEffect } from 'react';
import { SideBar } from '../components/candidate/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../components/common/home/Header';

const menuItems = [

  { label: 'Saved Jobs', path: '/candidate/jobs' },
  { label: 'Profile', path: '/candidate/profile' },
  { label: 'Applications', path: '/candidate/applications' },
  { label: 'Interviews', path: '/candidate/interviews' },
  { label: 'Messages', path: '/candidate/messages' },
    { label: 'Dashboard', path: '/candidate/dashboard' },
];

export const CandidateLayout = () => {
 const location = useLocation();
  const currentPath = location.pathname;

 
  const item = menuItems.find((item) =>
    currentPath.startsWith(item.path)
  );
  const [isSidebarOpen, setsidebarOpen] = useState(true);
  const [activeItem,setActiveItem]=useState<{label:string,path:string}>(item?item:  { label: 'Dashboard', path: '/candidate/dashboard' })
 
  
 console.log('currentPath,active item',currentPath,activeItem);
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setsidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    if(item)setActiveItem(item)

    return () => window.removeEventListener('resize', handleResize);
  }, [item]);

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
          nav={activeItem.label}
        />

        <div className="flex-1  bg-gray-100">
          <Header />
          <div className="p-3 h-full  'flex-1 overflow-hidden'">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
