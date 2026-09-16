import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Compass,
  ExternalLink,
  Globe,
  Linkedin,
  MapPin,
  Sparkle,
  Target,
  Users,
} from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import type { CompanyProfileType } from '../../../../types/dtos/profile-types/user.types';

export const Hero = ({ company }: { company: CompanyProfileType | null }) => {
  const { t } = useTheme();
  if (!company) return null;
  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div
        className={`absolute -top-24 -left-16 h-64 w-64 rounded-full blur-3xl ${t.heroGlow}`}
      />
      <div
        className={`absolute -bottom-24 -right-10 h-72 w-72 rounded-full blur-3xl ${t.heroGlow}`}
      />
      <div
        className={`relative ${t.heroAccent} border ${t.surfaceBorder} rounded-3xl px-6 py-12 sm:px-10 sm:py-14 text-center shadow-sm`}
      >
        <div className="flex justify-center">
          <div
            className={`h-20 w-20 sm:h-24 sm:w-24 rounded-2xl ${t.cardBg} border ${t.cardBorder} shadow-md flex items-center justify-center transition-transform duration-300 hover:-translate-y-1`}
          >
            <Building2 className={`h-9 w-9 ${t.sectionIconText}`} />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center gap-2">
          <h1
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${t.heading}`}
          >
            {company.companyName}
          </h1>
          {company.isVerified && (
            <BadgeCheck className="h-5 w-5 text-fuchsia-500" />
          )}
        </div>
        <p
          className={`mt-3 max-w-xl mx-auto text-sm sm:text-base ${t.subheading}`}
        >
          {company.tagline}
        </p>
        <div
          className={`mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm ${t.subheading}`}
        >
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="h-4 w-4" />
            {company.industry}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {company.size}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {`${company.address.state},${company.address.country}`}
          </span>
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${t.primaryButton} ${t.primaryButtonHover}`}
            >
              <Globe className="h-4 w-4" /> Visit Website
            </a>
          )}
          {company.socialMediaLinks.linkedIn && (
            <a
              href={company.socialMediaLinks.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${t.secondaryButton} ${t.secondaryButtonHover}`}
            >
              <Linkedin className="h-4 w-4" /> LinkedIn{' '}
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const QuickFacts = ({
  company,
}: {
  company: CompanyProfileType | null;
}) => {
  const { t } = useTheme();
  if (!company) return null;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Industry', value: company.industry, icon: Building2 },
        { label: 'Company Size', value: company.size, icon: Users },
        {
          label: 'Founded',
          value: String(company.startedIn),
          icon: CalendarDays,
        },
        {
          label: 'Location',
          value: `${company.address.state},${company.address.country}`,
          icon: MapPin,
        },
      ].map((s) => (
        <div
          key={s.label}
          className={`rounded-2xl border ${t.cardBorder} ${t.cardBg} p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${t.cardHoverBorder}`}
        >
          <div
            className={`h-9 w-9 rounded-xl flex items-center justify-center ${t.statIconBg}`}
          >
            <s.icon className={`h-4 w-4 ${t.statIconText}`} />
          </div>
          <p
            className={`mt-3 text-xs font-medium uppercase tracking-wide ${t.subheading}`}
          >
            {s.label}
          </p>
          <p className={`mt-1 text-sm font-semibold ${t.cardTitle}`}>
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export const VisionAndMission = ({
  company,
}: {
  company: CompanyProfileType | null;
}) => {
  const { t } = useTheme();
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {[
        { title: ' Mission', text: company?.mission, icon: Target },
        { title: ' Vision', text: company?.vision, icon: Compass },
      ].map((c) => (
        <div
          key={c.title}
          className={`rounded-2xl border ${t.cardBorder} ${t.cardBg} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${t.cardHoverBorder}`}
        >
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center ${t.sectionIconBg}`}
          >
            <c.icon className={`h-5 w-5 ${t.sectionIconText}`} />
          </div>
          <h3 className={`mt-4 text-base font-semibold ${t.cardTitle}`}>
            {c.title}
          </h3>
          <p className={`mt-2 text-sm leading-relaxed ${t.subheading}`}>
            {c.text ? c.text : `${c.title} is not added yet`}
          </p>
        </div>
      ))}
    </div>
  );
};

export const Culture=({company}:{company:CompanyProfileType|null})=>{
    const {t}=useTheme()
    return( <section>
          <h2 className={`text-lg sm:text-xl font-bold ${t.heading}`}>
            Life at {company?.companyName.split(' ')[0]}
          </h2>
          <p className={`mt-1 text-sm ${t.subheading}`}>
            A glimpse into what it's like to work here.
          </p>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            
              <div
              
                className={`rounded-2xl border ${t.cardBorder} ${t.cardBg} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${t.cardHoverBorder}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`h-9 w-9 shrink-0 rounded-xl flex items-center justify-center ${t.sectionIconBg}`}
                  >
                    <Sparkle className={`h-4 w-4 ${t.sectionIconText}`} />
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold ${t.cardTitle}`}>
                     Company Culture
                    </h3>
                    <p
                      className={`mt-1 text-sm leading-relaxed ${t.subheading}`}
                    >
                      {company?.culture?company.culture:'Culture is not added yet'}
                    </p>
                  </div>
                </div>
              </div>
           
          </div>
        </section>)
}
