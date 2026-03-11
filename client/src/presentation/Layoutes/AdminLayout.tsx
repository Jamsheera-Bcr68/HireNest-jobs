import Header from '../components/admin/Header';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/Sidebar';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [title, setTitle] = useState('Dashboard');
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <div className="flex min-h-screen">
        <AdminSidebar
          setTitle={setTitle}
          sidebarOpen={sidebarOpen}
          nav="Dashboard"
        />

        <div className="flex-1">
          <Header
            title={title}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <div className="flex-1 p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
