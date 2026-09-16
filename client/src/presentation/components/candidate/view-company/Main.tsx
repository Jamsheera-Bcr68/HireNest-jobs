import {
  Briefcase,
  Compass,
  Github,
  Globe,
  IndianRupee,
  Linkedin,
  MapPin,
  MessageCircle,
  Target,
  Twitter,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import type { CompanyProfileType } from '../../../../types/dtos/profile-types/user.types';
import { Culture, Hero, QuickFacts, VisionAndMission } from './Components';
import type { JobCardDto } from '../../../../types/dtos/job.dto';
import { formatSalary } from '../../../../utils/salary-format';
import { useNavigate } from 'react-router-dom';
import { object } from 'zod';
import { useCallback, useState } from 'react';
import type { ISocialLinks } from '../../../../types/profile.types';

export function Main({
  company,
  positions,
}: {
  company: CompanyProfileType | null;
  positions: JobCardDto[];
}) {
  const { t } = useTheme();
  const navigate = useNavigate();
  const [socialLinks, setSocialLinks] = useState<
    {
      label: string;
      href: string;
      icon: LucideIcon;
    }[]
  >([]);
  if (!company) return null;
  const socialConfig: Record<
    keyof ISocialLinks,
    { label: string; icon: LucideIcon }
  > = {
    gitHub: {
      label: 'GitHub',
      icon: Github,
    },
    linkedIn: {
      label: 'LinkedIn',
      icon: Linkedin,
    },
    twitter: {
      label: 'Twitter',
      icon: Twitter,
    },
    portfolio: {
      label: 'Portfolio',
      icon: Globe,
    },
    youtube: {
      label: 'YouTube',
      icon: Youtube,
    },
    whatsapp: {
      label: 'WhatsApp',
      icon: MessageCircle,
    },
  };

  const links: {
    label: string;
    href: string;
    icon: LucideIcon;
  }[] = [];

  if (!company) return null;

  if (company.socialMediaLinks) {
    (Object.keys(socialLinks) as (keyof ISocialLinks)[]).forEach((key) => {
      const href = company.socialMediaLinks[key];

      if (href) {
        links.push({
          label: socialConfig[key].label,
          href,
          icon: socialConfig[key].icon,
        });
      }
      setSocialLinks(links);
    });
  }
  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero */}
        <Hero company={company} />
        {/* Quick facts */}

        <QuickFacts company={company} />
        {/* About */}
        <section>
          <h2 className={`text-lg sm:text-xl font-bold ${t.heading}`}>
            About {company?.companyName}
          </h2>
          <p
            className={`mt-3 text-sm sm:text-[15px] leading-relaxed ${t.pageText}`}
          >
            {company?.about}
          </p>
        </section>

        {/* Mission & Vision */}
        <VisionAndMission company={company} />

        {/* Culture */}
        <section>
          <h2 className={`text-lg sm:text-xl font-bold ${t.heading}`}>
            Life at {company?.companyName.split(' ')[0]}
          </h2>
          <div
            className={`mt-4 flex items-start gap-3 rounded-2xl border ${t.cardBorder} ${t.cardBg} p-5 shadow-sm`}
          >
            <div>
              <p className={`mt-1 text-sm ${t.subheading}`}>
                A glimpse into what it's like to work here.
              </p>
              <p
                className={`mt-3 text-sm sm:text-[15px] leading-relaxed ${t.pageText}`}
              >
                {company?.culture
                  ? company.culture
                  : 'Culture is not added yet'}
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section>
          <h2 className={`text-lg sm:text-xl font-bold ${t.heading}`}>
            Benefits & Perks
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {company?.benefits.length
              ? company?.benefits.map((b, i) => (
                  <div
                    key={i}
                    className={`inline-flex items-center gap-2 rounded-full border ${t.cardBorder} ${t.skillChipBg} px-4 py-2 text-sm font-medium ${t.skillChipText} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm`}
                  >
                    {b}
                  </div>
                ))
              : 'No benefits added yet'}
          </div>
        </section>

        {/* Open Positions */}
        <section
        //ref={openPositionsRef}
        >
          <div className="flex items-baseline justify-between">
            <h2 className={`text-lg sm:text-xl font-bold ${t.heading}`}>
              Open Positions
            </h2>
            <span className={`text-xs font-medium ${t.subheading}`}>
              {positions.length} open roles
            </span>
          </div>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {positions.map((job) => (
              <div
                key={job.id}
                className={`rounded-2xl border ${t.cardBorder} ${t.cardBg} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${t.cardHoverBorder} flex flex-col h-full`}
              >
                <h3 className={`text-base font-semibold ${t.cardTitle}`}>
                  {job.title}
                </h3>
                <div
                  className={`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${t.subheading}`}
                >
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    {job.jobType} · {job.mode}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {`${(job.location.state, job.location.country)}`}
                  </span>
                </div>
                <p
                  className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold ${t.cardTitle}`}
                >
                  <IndianRupee className="h-3.5 w-3.5" />
                  {formatSalary(job.min_salary, job.max_salary)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <span
                      key={s}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${t.skillChipBg} ${t.skillChipText}`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div
                  className={`mt-4 pt-4 border-t border-dashed ${t.cardBorder} mt-auto`}
                >
                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className={`w-full sm:w-auto inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${t.secondaryButton} ${t.secondaryButtonHover}`}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}

        {/* Links */}
        <section>
          <h2 className={`text-lg sm:text-xl font-bold ${t.heading}`}>
            Website & Social Presence
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.length
              ? socialLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-xl border ${t.cardBorder} ${t.cardBg} px-4 py-2.5 text-sm font-medium ${t.cardTitle} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${t.cardHoverBorder}`}
                  >
                    <l.icon className="h-4 w-4" /> {l.label}
                  </a>
                ))
              : 'No Social media links added'}
          </div>
        </section>

       
      </div>
    </div>
  );
}
