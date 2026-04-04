import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  'Dashboard',
  'Companies',
  'Candidates',
  'Job Listings',
  'Pendings',
];
const navIcons = ['⊞', '🏢', '👥', '💼', '📊'];
const navLinks: Record<string, string> = {
  Dashboard: '/admin',
  Candidates: '/admin/candidates ',
  Companies: '/admin/companies',
  'Job Listings': '/admin/jobs',
  Pendings: '/admin/reports',
};
function Sidebar({
  setTitle,
  nav = 'Dashboard',
  sidebarOpen,
}: {
  setTitle: (item: string) => void;
  nav: string;
  sidebarOpen: boolean;
}) {
  const [activeNav, setActiveNav] = useState(nav);
  const navigate = useNavigate();

  return (
    <aside
      className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all h-screen sticky top-0 duration-300 bg-slate-900 flex flex-col shrink-0`}
    >
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">H</span>
        </div>
        {sidebarOpen && (
          <div>
            <span className="text-white font-bold text-lg tracking-tight">
              HireNest
            </span>
            <span className="ml-2 text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full font-semibold">
              Admin
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item, i) => (
          <button
            key={item}
            onClick={() => {
              setTitle(item);
              console.log('item,navLinks[item]', item, navLinks[item]);

              navigate(navLinks[item]);
              setActiveNav(item);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeNav === item
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span className="text-base">{navIcons[i]}</span>
            {sidebarOpen && <span>{item}</span>}
          </button>
        ))}
      </nav>

      {/* <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">SA</span>
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-white text-sm font-medium truncate">Super Admin</p>
                <p className="text-slate-400 text-xs truncate">admin@hireflow.io</p>
              </div>
            )}
          </div>
        </div> */}
    </aside>
  );
}

export default Sidebar;
