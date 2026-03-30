import { useState } from 'react';
import {
  Home,
  LogOutIcon,
  MessagesSquareIcon,
  ChevronRight,
  BriefcaseBusiness,
  ChevronLeftIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const navItems = [
  'Dashboard',
  'Saved Jobs',
  'Applications',
  'Interviews',
  'Messages',
  'Profile',
  'Logout',
];
const navRoutes: Record<string, string> = {
  Dashboard: '/candidate/dashboard',
  'Saved Jobs': '/candidate/jobs',
  Applications: '/candidate/applications',
  Interviews: '/candidate/interviews',
  Messages: '/candidate/messages',
  Profile: '/candidate/profile',
  Logout: '/logout',
};
const navIcons = [
  <Home />,
  <BriefcaseBusiness />,
  '📋',
  '📅',
  <MessagesSquareIcon />,
  '👤',
  <LogOutIcon />,
];
type SidebarProps = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  setTitle: (title: string) => void;
};
export const SideBar = ({ isOpen, setOpen, setTitle }: SidebarProps) => {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const navigate = useNavigate();
  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
      className="flex sticky top-0 h-screen bg-slate-30 overflow-hidden"
    >
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'w-64' : 'w-16'
        } transition-all duration-300 bg-slate-900 flex flex-col shrink-0`}
      >
        {/* Nav */}

        <nav className="flex-1 py-6 px-3 space-y-1">
          <button
            onClick={() => setOpen(!isOpen)}
            className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-base">
                <BriefcaseBusiness />
              </span>

              {isOpen && <span className="text-base">HireNest</span>}
            </div>

            <span className="flex items-center justify-center">
              {isOpen ? (
                <ChevronLeftIcon size={22} />
              ) : (
                <ChevronRight size={22} />
              )}
            </span>
          </button>
          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => {
                setTitle(item);
                setActiveNav(item);
                navigate(navRoutes[item]);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeNav === item
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="text-base">{navIcons[i]}</span>
              {isOpen && <span>{item}</span>}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
};
