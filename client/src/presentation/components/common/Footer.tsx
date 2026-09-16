import { Eye, Info, Sparkles, UserPlus, Users } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext'
import { useLocation } from 'react-router-dom';
const Footer = () => {
  const { t } = useTheme();
 
  return (
    <footer className="border-t bg-gray-500 text-white bg-card py-12">
      {' '}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {' '}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {' '}
          <div className="col-span-2 sm:col-span-1">
            {' '}
            <div className="flex items-center gap-2">
              {' '}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                {' '}
                <Eye className="h-4 w-4 text-primary-foreground" />{' '}
              </div>{' '}
              <span className="text-lg font-bold text-foreground">
                {' '}
                HireNest{' '}
              </span>{' '}
            </div>{' '}
            <p className="mt-3 text-sm text-muted-foreground">
              {' '}
              The modern hiring platform for ambitious employers.{' '}
            </p>{' '}
          </div>{' '}
          {[
            {
              title: 'Platform',
              links: ['Post Jobs', 'Find Talent', 'Pricing', 'Enterprise'],
            },
            {
              title: 'Company',
              links: ['About Us', 'Careers', 'Blog', 'Press'],
            },
            {
              title: 'Support',
              links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms'],
            },
          ].map((col) => (
            <div key={col.title}>
              {' '}
              <h4 className="font-semibold text-foreground">
                {col.title}
              </h4>{' '}
              <ul className="mt-3 space-y-2">
                {' '}
                {col.links.map((link) => (
                  <li key={link}>
                    {' '}
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {' '}
                      {link}{' '}
                    </a>{' '}
                  </li>
                ))}{' '}
              </ul>{' '}
            </div>
          ))}{' '}
        </div>{' '}
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          {' '}
          © 2026 HireNest. All rights reserved.{' '}
        </div>{' '}
      </div>{' '}
    </footer>
  );
};

export default Footer;

import { Home, BriefcaseBusiness, Building2, LogIn } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const BottomNav = () => {
  const location = useLocation();
  const { t } = useTheme();

  const navItems = [
    {
      label: 'Home',
      icon: Home,
      path: '/',
    },
    {
      label: 'About',
      icon: Info,
      path: '#what',
    },
    {
      label: 'Employers',
      icon: Building2,
      path: '#employers',
    },
    {
      label: 'Candidates',
      icon: Users,
      path: '#candidates',
    },
    {
      label: 'Features',
      icon: Sparkles,
      path: '#features',
    },
    {
      label: 'Services',
      icon: BriefcaseBusiness,
      path: '#services',
    },
    {
      label: 'Login',
      icon: LogIn,
      path: '/login',
    },
    {
      label: 'SignUp',
      icon: UserPlus,
      path: '/register',
    },
  ];

  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-50
        border-t ${t.navBorder} ${t.navBg}
        pb-[env(safe-area-inset-bottom)]
      `}
    >
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isHashLink = path.startsWith('#');

          if (isHashLink) {
            const isActive = location.hash === path;

            return (
              <a
                key={path}
                href={path}
                className={`
                  flex h-full min-w-[70px] flex-col items-center justify-center
                  gap-1 rounded-xl px-3 text-[11px] font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? t.navActive
                      : `${t.navMuted} ${t.navIconBg}`
                  }
                `}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`
                    transition-all duration-200
                    ${isActive ? 'scale-110' : 'scale-100'}
                  `}
                />

                <span>{label}</span>
              </a>
            );
          }

          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `
                flex h-full min-w-[70px] flex-col items-center justify-center
                gap-1 rounded-xl px-3 text-[11px] font-medium
                transition-all duration-200
                ${
                  isActive
                    ? t.navActive
                    : `${t.navMuted} ${t.navIconBg}`
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`
                      transition-all duration-200
                      ${isActive ? 'scale-110' : 'scale-100'}
                    `}
                  />

                  <span>{label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
