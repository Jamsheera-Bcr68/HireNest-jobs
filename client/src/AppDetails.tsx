import {
  FileText,
  Building2,
  MapPin,
  CalendarDays,
  Clock,
  Download,
  ExternalLink,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  DollarSign,
  Timer,
  Globe,
} from 'lucide-react';

const application = {
  id: 'APP-20260412-0087',
  status: 'shortListed',
  appliedAt: 'Mar 12, 2026',
  deadline: 'Apr 30, 2026',
  resumeUrl: 'Resume_Arjun_K.pdf',
  coverLetter: 'Cover_Letter.pdf',
  salaryExpectation: '₹18 – 22 LPA',
  noticePeriod: '30 days',
  candidateName: 'Arjun Krishnan',
  candidateEmail: 'arjun.k@email.com',
  candidatePhone: '+91 98765 43210',
  currentRole: 'Frontend Dev, InfyTech',

  job: {
    title: 'Frontend Developer',
    type: 'Full Time',
    mode: 'Remote',
    location: 'Kochi, Kerala, India',
    postedDate: 'Mar 5, 2026',
    experience: '3–5 years',
  },

  company: {
    name: 'TechNova Pvt Ltd',
    location: 'Kochi',
    industry: 'Software & Technology',
    size: '201–500 employees',
  },

  skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'REST APIs'],

  timeline: [
    {
      stage: 'Application Submitted',
      date: 'Mar 12, 2026',
      status: 'done',
      note: '',
    },
    {
      stage: 'Viewed by Recruiter',
      date: 'Mar 14, 2026',
      status: 'done',
      note: '',
    },
    {
      stage: 'Shortlisted',
      date: 'Mar 18, 2026',
      status: 'active',
      note: 'Your profile stood out!',
    },
    { stage: 'Interview Scheduled', date: null, status: 'pending', note: '' },
    { stage: 'Final Decision', date: null, status: 'pending', note: '' },
  ],
};

const statusConfig = {
  shortListed: {
    label: 'Shortlisted',
    className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
  underReview: {
    label: 'Under Review',
    className: 'bg-blue-50 text-blue-700 border border-blue-200',
  },
  applied: {
    label: 'Applied',
    className: 'bg-violet-50 text-violet-700 border border-violet-200',
  },
  rejected: {
    label: 'Not Selected',
    className: 'bg-red-50 text-red-600 border border-red-200',
  },
};

const statusStyle = statusConfig.applied;

function TimelineDot({ status }) {
  if (status === 'done')
    return (
      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 size={12} className="text-white" />
      </div>
    );
  if (status === 'active')
    return (
      <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-blue-200 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
    );
  return (
    <div className="w-5 h-5 rounded-full bg-gray-100 border-2 border-gray-200 flex-shrink-0" />
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={13} className="text-gray-400" />
      </div>
      <div>
        <p className="text-[11px] text-gray-400 font-medium mb-0.5">{label}</p>
        <p className="text-sm text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">
      {children}
    </p>
  );
}

function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export default function ApplicationDetailsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
          <ChevronLeft size={16} />
          Back to My Applications
        </button>

        {/* Hero Header */}
        <Card className="mb-5 overflow-hidden">
          <div className="relative p-7">
            <div className="absolute top-0 right-0 w-56 h-56 rounded-bl-full bg-gradient-to-br from-emerald-50 to-blue-50 opacity-60 pointer-events-none" />
            <div className="relative flex flex-wrap items-start gap-5">
              {/* Logo */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-md">
                TN
              </div>

              {/* Title */}
              <div className="flex-1 min-w-[200px]">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {application.job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 mb-3">
                  <Building2 size={13} />
                  <span>{application.company.name}</span>
                  <span className="text-gray-300">·</span>
                  <MapPin size={13} />
                  <span>{application.job.location}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-violet-50 text-violet-700 font-medium">
                    {application.job.type}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                    {application.job.mode}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-medium">
                    {application.job.experience} exp
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`text-xs font-semibold px-4 py-1.5 rounded-full ${statusStyle.className}`}
                >
                  {statusStyle.label}
                </span>
                <p className="text-xs text-gray-400">
                  Applied {application.appliedAt}
                </p>
                <p className="text-[11px] text-gray-300 font-mono">
                  {application.id}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* LEFT */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Timeline */}
            <Card className="p-6">
              <SectionTitle>Application Progress</SectionTitle>
              <div className="flex flex-col">
                {application.timeline.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <TimelineDot status={item.status} />
                      {i < application.timeline.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 my-1 min-h-[28px] ${item.status === 'done' ? 'bg-emerald-200' : 'bg-gray-100'}`}
                        />
                      )}
                    </div>
                    <div className="pb-6 last:pb-0 pt-0.5">
                      <p
                        className={`text-sm font-medium ${item.status === 'pending' ? 'text-gray-300' : item.status === 'active' ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}
                      >
                        {item.stage}
                      </p>
                      {item.date && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.date}
                        </p>
                      )}
                      {item.note && (
                        <p className="text-xs text-emerald-600 mt-1 italic">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Application Details */}
            <Card className="p-6">
              <SectionTitle>Application Details</SectionTitle>
              <InfoRow
                icon={CalendarDays}
                label="Applied On"
                value={application.appliedAt}
              />
              <InfoRow
                icon={Timer}
                label="Application Deadline"
                value={application.deadline}
              />
              <InfoRow
                icon={Clock}
                label="Notice Period"
                value={application.noticePeriod}
              />
              <InfoRow
                icon={DollarSign}
                label="Salary Expectation"
                value={application.salaryExpectation}
              />
              <InfoRow
                icon={CalendarDays}
                label="Job Posted"
                value={application.job.postedDate}
              />

              {/* Skills */}
              <div className="mt-5">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                  Skills You Applied With
                </p>
                <div className="flex flex-wrap gap-2">
                  {application.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full bg-violet-50 text-violet-700 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="mt-5">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                  Documents Submitted
                </p>
                <div className="flex flex-col gap-2.5">
                  {[application.resumeUrl, application.coverLetter].map(
                    (doc) => (
                      <div
                        key={doc}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                      >
                        <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                          <FileText size={15} className="text-red-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {doc}
                          </p>
                          <p className="text-xs text-gray-400">PDF</p>
                        </div>
                        <button className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                          <Download size={11} /> Download
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                Edit Application
              </button>
              <button className="flex-1 py-3 rounded-xl text-sm font-medium border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                Withdraw Application
              </button>
            </div>
          </div>

          {/* RIGHT Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Candidate Profile */}
            <Card className="p-5">
              <SectionTitle>Your Profile</SectionTitle>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center text-violet-700 font-bold text-base flex-shrink-0">
                  AK
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {application.candidateName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {application.currentRole}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={13} className="text-gray-300" />
                  {application.candidateEmail}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={13} className="text-gray-300" />
                  {application.candidatePhone}
                </div>
              </div>
            </Card>

            {/* Job Summary */}
            <Card className="p-5">
              <SectionTitle>Job Summary</SectionTitle>
              <div className="flex flex-col divide-y divide-gray-100">
                {[
                  { label: 'Type', value: application.job.type },
                  { label: 'Mode', value: application.job.mode },
                  { label: 'Experience', value: application.job.experience },
                  { label: 'Location', value: application.job.location },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-start py-2.5"
                  >
                    <span className="text-xs text-gray-400">{label}</span>
                    <span className="text-xs text-gray-800 font-medium text-right max-w-[55%]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 rounded-xl text-xs font-medium border border-gray-200 bg-gray-50 text-gray-600 flex items-center justify-center gap-1.5 hover:bg-gray-100 transition-colors">
                <ExternalLink size={12} /> View Job Posting
              </button>
            </Card>

            {/* Company */}
            <Card className="p-5">
              <SectionTitle>Company</SectionTitle>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  TN
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {application.company.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {application.company.industry}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={12} className="text-gray-300" />{' '}
                  {application.company.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Building2 size={12} className="text-gray-300" />{' '}
                  {application.company.size}
                </div>
              </div>
              <button className="w-full mt-4 py-2.5 rounded-xl text-xs font-medium border border-gray-200 bg-gray-50 text-gray-600 flex items-center justify-center gap-1.5 hover:bg-gray-100 transition-colors">
                <Globe size={12} /> View Company Profile
              </button>
            </Card>

            {/* Warning */}
            <div className="flex gap-3 items-start bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <AlertCircle
                size={14}
                className="text-amber-500 flex-shrink-0 mt-0.5"
              />
              <p className="text-xs text-amber-700 leading-relaxed">
                Withdrawing your application is permanent. You'll need to
                re-apply if you change your mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
