import type { CompanyDataDto } from '../../../../types/dtos/company.dto';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function CompanyModalContent({ company }: { company: CompanyDataDto | null }) {
  if (!company) return null;
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex gap-4 items-start">
        {company.logoUrl ? (
          <img
            src={`${baseUrl}${company.logoUrl}`}
            alt="logo"
            className="w-16 h-16 rounded-xl object-cover border"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-lg">
            {company.companyName?.charAt(0)}
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            {company.companyName}
          </h2>

          {company.tagLine && (
            <p className="text-sm text-blue-500 mt-1 italic">
              "{company.tagLine}"
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border border-slate-200 bg-slate-50 text-slate-600">
              {company.industry}
            </span>

            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border border-slate-200 bg-slate-50 text-slate-600">
              Est. {company.startedIn}
            </span>

            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border border-slate-200 bg-slate-50 text-slate-600">
              {company.size}
            </span>
          </div>
        </div>
      </div>

      {/* About */}
      <Section title="About">{company.about}</Section>

      {/* Mission / Vision / Culture */}
      <div className="grid md:grid-cols-3 gap-3">
        {company.mission && (
          <InfoCard title="Mission">{company.mission}</InfoCard>
        )}

        {company.vision && <InfoCard title="Vision">{company.vision}</InfoCard>}

        {company.culture && (
          <InfoCard title="Culture">{company.culture}</InfoCard>
        )}
      </div>

      {/* Benefits */}
      {company.benefits?.length > 0 && (
        <div>
          <SectionHeading>Benefits</SectionHeading>

          <div className="flex flex-wrap gap-2">
            {company.benefits.map((benefit) => (
              <span
                key={benefit}
                className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-600 border"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Social + Website */}
      <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
        <div className="flex flex-wrap gap-2">
          {company.socialMediaLinks?.linkedIn && (
            <SocialBtn
              label="LinkedIn"
              link={company.socialMediaLinks.linkedIn}
            />
          )}

          {company.socialMediaLinks?.twitter && (
            <SocialBtn
              label="Twitter"
              link={company.socialMediaLinks.twitter}
            />
          )}

          {company.website && (
            <SocialBtn label="Website" link={company.website} />
          )}
        </div>

        {company.website && (
          <a
            href={`${company.website}/careers`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
          >
            View open roles →
          </a>
        )}
      </div>
    </div>
  );
}

export default CompanyModalContent;

/* ---------- small helpers ---------- */

const Section = ({ title, children }: any) => (
  <div>
    <SectionHeading>{title}</SectionHeading>

    <p className="text-sm text-slate-600 leading-relaxed">{children}</p>
  </div>
);

const InfoCard = ({ title, children }: any) => (
  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
      {title}
    </p>

    <p className="text-sm text-slate-700">{children}</p>
  </div>
);

const SectionHeading = ({ children }: any) => (
  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
    {children}
  </p>
);

const SocialBtn = ({ label, link }: any) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer"
    className="px-3 py-1.5 text-xs border rounded-lg text-slate-600 hover:bg-slate-50 transition"
  >
    {label}
  </a>
);
