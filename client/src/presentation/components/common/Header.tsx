import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../pages/user/Landing';

const Header = ({
  active,
  setActive,
}: {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === 'Escape' && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const go = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="relative  z-50 mx-4">
      <div className="text-fuchsia -800 fixed top-8 left-2 right-2 rounded-full bg-white border-2 border-fuchsia-700 shadow-sm">
        <nav className="container px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            {/* <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold text-fuchsia-800">
                HireNest
              </a>
            </div> */}
            <Link
              to="/"
              aria-label="HireNest home"
              className="group flex shrink-0 items-center gap-3"
            >
              <span className="relative">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-fuchsia-400/50 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
                />
                <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-2 ring-fuchsia-700 transition-all duration-300 group-hover:-rotate-3 group-hover:scale-110 group-hover:ring-fuchsia-600 group-active:scale-95 motion-reduce:transform-none">
                  <img
                    src="/6.jpg"
                    alt=""
                    width={44}
                    height={44}
                    className="h-full w-full object-contain p-1.5"
                  />
                </span>
              </span>

              <span className="text-2xl font-bold leading-none text-fuchsia-800 transition-colors duration-300 group-hover:text-fuchsia-600">
                HireNest
              </span>
            </Link>

            <div className="hidden items-center gap-4 xl:gap-8 lg:flex">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setActive(l.href)}
                  aria-current={active === l.href ? 'true' : undefined}
                  className={`px-3 py-2 text-sm font-bold text-fuchsia-700 transition-transform duration-300 hover:-translate-y-1 ${
                    active === l.href
                      ? 'underline underline-offset-8 decoration-2'
                      : ''
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            {/* <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-fuchsia-800 text-white hover:bg-fuchsia-500 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Login
              </button>

              <button
                onClick={() => navigate('/register')}
                className="bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Register
              </button>
            </div> */}

            <div className="hidden items-center gap-3 lg:flex">
              <button
                onClick={() => go('/login')}
                className="rounded-lg bg-fuchsia-800 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-fuchsia-600"
              >
                Login
              </button>
              <button
                onClick={() => go('/register')}
                className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                Register
              </button>
            </div>

            {/* Mobile Menu Button */}
            {/* <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 rounded-lg p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div> */}
            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="rounded-lg p-2 text-slate-600 hover:text-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 lg:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}

          {isMenuOpen && (
            <div
              id="mobile-menu"
              className="absolute inset-x-0 top-full mt-2 max-h-[calc(100svh-6rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-lg lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-fuchsia-700 transition-colors hover:bg-slate-50"
                  >
                    {l.label}
                  </a>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3">
                <button
                  onClick={() => go('/login')}
                  className="rounded-lg bg-fuchsia-800 px-3 py-3 text-base font-medium text-white hover:bg-fuchsia-600"
                >
                  Login
                </button>
                <button
                  onClick={() => go('/register')}
                  className="rounded-lg bg-emerald-600 px-3 py-3 text-base font-medium text-white hover:bg-emerald-700"
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
