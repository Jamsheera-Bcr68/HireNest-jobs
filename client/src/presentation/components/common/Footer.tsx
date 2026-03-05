import { Eye } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-gray-500 text-white bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Eye className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">
                HireNest
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              The modern hiring platform for ambitious employers.
            </p>
          </div>
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
              <h4 className="font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © 2026 HireNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
