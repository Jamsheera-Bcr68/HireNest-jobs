import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Youtube,
  MessageCircle,
  ExternalLink,
  Link2Off,
} from 'lucide-react';
import {
  CompactEmptyState,
  SectionCard,
} from '../../components/admin/companyDetails/RegistrationDetails';

export type ISocialLinks = {
  gitHub?: string;
  linkedIn?: string;
  twitter?: string;
  portfolio?: string;
  youtube?: string;
  whatsapp?: string;
};

interface SocialLinksProps {
  socialLinks?: ISocialLinks | null;
}

export function SocialLinks({ socialLinks }: SocialLinksProps) {
  const links = [
    {
      key: 'gitHub',
      label: 'GitHub',
      value: socialLinks?.gitHub,
      icon: Github,
    },
    {
      key: 'linkedIn',
      label: 'LinkedIn',
      value: socialLinks?.linkedIn,
      icon: Linkedin,
    },
    {
      key: 'twitter',
      label: 'Twitter',
      value: socialLinks?.twitter,
      icon: Twitter,
    },
    {
      key: 'portfolio',
      label: 'Portfolio',
      value: socialLinks?.portfolio,
      icon: Globe,
    },
    {
      key: 'youtube',
      label: 'YouTube',
      value: socialLinks?.youtube,
      icon: Youtube,
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      value: socialLinks?.whatsapp,
      icon: MessageCircle,
    },
  ];

  const availableLinks = links.filter((link) => link.value?.trim());
  return (
    <SectionCard className='' title="Social Media & Links">
      {' '}
      {availableLinks.length > 0 ? (
        <div className="space-y-3">
          {' '}
          {availableLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.key}
                href={link.value}
                target="_blank"
                rel="noopener noreferrer"
                className=" group flex w-full items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-100 hover:bg-indigo-50/50 hover:shadow-sm "
              >
                {' '}
                {/* Left side */}{' '}
                <div className="flex min-w-0 items-center gap-3">
                  {' '}
                  <div className=" flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 transition-colors duration-300 group-hover:bg-indigo-200 ">
                    {' '}
                    <Icon className="h-4 w-4 text-indigo-600" />{' '}
                  </div>{' '}
                  <div className="min-w-0">
                    {' '}
                    <p className="text-sm font-semibold text-slate-800">
                      {' '}
                      {link.label}{' '}
                    </p>{' '}
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {' '}
                      {link.value}{' '}
                    </p>{' '}
                  </div>{' '}
                </div>{' '}
                {/* Right side */}{' '}
                <ExternalLink className=" h-4 w-4 shrink-0 text-slate-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-indigo-600 " />{' '}
              </a>
            );
          })}{' '}
        </div>
      ) : (
        <CompactEmptyState icon={Link2Off} text="No social media links available." />
      )}{' '}
    </SectionCard>
  );
  //   return (
  //     <SectionCard className="" title="Social Media & Links">
  //       {availableLinks.length > 0 ? (
  //         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
  //           {availableLinks.map((link) => {
  //             const Icon = link.icon;

  //             return (
  //               <a
  //                 key={link.key}
  //                 href={link.value}
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //                 className="group flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-100 hover:bg-indigo-50/50 hover:shadow-sm"
  //               >
  //                 <div className="flex min-w-0 items-center gap-3">
  //                   <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 transition-colors duration-300 group-hover:bg-indigo-200">
  //                     <Icon className="h-4 w-4 text-indigo-600" />
  //                   </div>

  //                   <div className="min-w-0">
  //                     <p className="text-sm font-semibold text-slate-800">
  //                       {link.label}
  //                     </p>

  //                     <p className="truncate text-xs text-slate-500">
  //                       {link.value}
  //                     </p>
  //                   </div>
  //                 </div>

  //                 <ExternalLink className="h-4 w-4 shrink-0 text-slate-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-indigo-600" />
  //               </a>
  //             );
  //           })}
  //         </div>
  //       ) : (
  //         <CompactEmptyState text="No social media links available." />
  //       )}
  //     </SectionCard>
  //   );
}
