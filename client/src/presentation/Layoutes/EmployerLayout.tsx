import { useState } from 'react';
import { SideBar } from '../components/user/employer/SideBar';
import { Outlet } from 'react-router-dom';

export const EmployerLayout = () => {
  const [isSidebarOpen, setsidebarOpen] = useState(true);
  const [title, seTitle] = useState('Dashboard');
  return (
    <div className="flex min-h-screen ">
      <SideBar
        isOpen={isSidebarOpen}
        setOpen={setsidebarOpen}
        setTitle={seTitle}
      />
      <div className="flex-1 bg-gray-100">
        <div className="h-16 bg-white sticky top-0 shadow flex items-center px-6">
          <h1 className="font-bold text-lg">My {title}</h1>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
