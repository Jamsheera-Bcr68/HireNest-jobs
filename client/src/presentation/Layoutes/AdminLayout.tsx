import Header from '../components/admin/Header';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/Sidebar';
import { useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Candidates', path: '/admin/candidates' },
  { label: 'Companies', path: '/admin/companies' },
  { label: 'Job Listings', path: '/admin/jobs' },
  { label: 'Skills', path: '/admin/skills' },
];
export const AdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const activeItem = menuItems.find((item) =>
    currentPath.startsWith(item.path)
  );
  console.log('active item', activeItem);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [title, setTitle] = useState(`${activeItem?.label || 'Dashboard'}`);
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
          nav={`${activeItem?.label || 'Dashboard'}`}
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
