import { useState } from 'react';

const candidate = {
  id: 'C-10482',
  name: 'Arjun Menon',
  title: 'Senior Frontend Developer',
  avatar: null,
  initials: 'AM',
  email: 'arjun.menon@email.com',
  phone: '+91 98765 43210',
  location: 'Kochi, Kerala',
  linkedin: 'linkedin.com/in/arjunmenon',
  website: 'arjunmenon.dev',
  joinedDate: 'March 12, 2024',
  status: 'Active',
  about:
    'Passionate frontend developer with 6+ years of experience building scalable web applications. Specializes in React ecosystems, performance optimization, and design systems. Open to senior and lead roles in product-focused companies.',
  skills: [
    'React',
    'TypeScript',
    'Next.js',
    'Tailwind CSS',
    'Node.js',
    'GraphQL',
    'Figma',
    'AWS',
  ],
  education: [
    {
      id: 1,
      degree: 'B.Tech in Computer Science',
      institution: 'College of Engineering, Trivandrum',
      year: '2014 – 2018',
      grade: '8.7 CGPA',
    },
    {
      id: 2,
      degree: 'Higher Secondary (Science)',
      institution: "St. Joseph's HSS, Kochi",
      year: '2012 – 2014',
      grade: '92%',
    },
  ],
  experience: [
    {
      id: 1,
      role: 'Senior Frontend Developer',
      company: 'Zoho Corporation',
      duration: 'Jan 2021 – Present',
      type: 'Full-time',
      description:
        'Led a team of 5 engineers to rebuild the Zoho CRM dashboard using React and TypeScript. Reduced load time by 40% through code splitting and lazy loading.',
    },
    {
      id: 2,
      role: 'Frontend Developer',
      company: 'TCS Digital',
      duration: 'Jul 2018 – Dec 2020',
      type: 'Full-time',
      description:
        'Developed responsive UI components for banking clients. Worked closely with UX designers to implement pixel-perfect interfaces using Angular and SCSS.',
    },
  ],
  stats: {
    totalApplications: 8,
    totalInterviews: 5,
    shortlisted: 3,
    rejected: 2,
    pending: 3,
    hired: 0,
  },
  applications: [
    {
      id: 1,
      role: 'Lead React Developer',
      company: 'Infosys',
      date: 'Mar 10, 2025',
      status: 'Interview Scheduled',
    },
    {
      id: 2,
      role: 'Frontend Engineer',
      company: 'Freshworks',
      date: 'Feb 28, 2025',
      status: 'Shortlisted',
    },
    {
      id: 3,
      role: 'UI/UX Developer',
      company: "Byju's",
      date: 'Feb 14, 2025',
      status: 'Rejected',
    },
    {
      id: 4,
      role: 'Senior Developer',
      company: 'Razorpay',
      date: 'Jan 30, 2025',
      status: 'Pending Review',
    },
  ],
  interviews: [
    {
      id: 1,
      role: 'Lead React Developer',
      company: 'Infosys',
      date: 'Mar 18, 2025',
      round: 'Technical Round 2',
      result: 'Passed',
    },
    {
      id: 2,
      role: 'Frontend Engineer',
      company: 'Freshworks',
      date: 'Mar 5, 2025',
      round: 'HR Round',
      result: 'Passed',
    },
    {
      id: 3,
      role: 'UI/UX Developer',
      company: "Byju's",
      date: 'Feb 20, 2025',
      round: 'Technical Round 1',
      result: 'Failed',
    },
    {
      id: 4,
      role: 'Senior Developer',
      company: 'Razorpay',
      date: 'Feb 8, 2025',
      round: 'Screening Call',
      result: 'Passed',
    },
  ],
  resumes: [
    {
      id: 1,
      name: 'Arjun_Menon_Resume_2025.pdf',
      uploadedOn: 'Mar 1, 2025',
      size: '324 KB',
      isPrimary: true,
    },
    {
      id: 2,
      name: 'Arjun_Menon_Resume_2024.pdf',
      uploadedOn: 'Jan 10, 2024',
      size: '298 KB',
      isPrimary: false,
    },
  ],
};

const statusColor = (status) => {
  const map = {
    'Interview Scheduled': 'bg-blue-100 text-blue-700',
    Shortlisted: 'bg-emerald-100 text-emerald-700',
    Rejected: 'bg-red-100 text-red-700',
    'Pending Review': 'bg-amber-100 text-amber-700',
    Passed: 'bg-emerald-100 text-emerald-700',
    Failed: 'bg-red-100 text-red-700',
    Active: 'bg-emerald-100 text-emerald-700',
    Inactive: 'bg-slate-100 text-slate-500',
  };
  return map[status] || 'bg-slate-100 text-slate-600';
};

const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
      <span className="text-slate-500 text-lg">{icon}</span>
      <h2 className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
        {title}
      </h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const StatCard = ({ label, value, color }) => (
  <div className={`rounded-xl p-4 flex flex-col gap-1 border ${color}`}>
    <span className="text-2xl font-bold">{value}</span>
    <span className="text-xs font-medium opacity-70">{label}</span>
  </div>
);

const tabs = ['Overview', 'Applications', 'Interviews', 'Resumes'];

export default function CandidateDetailsPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Nav Breadcrumb */}
      {/* <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-2 text-sm text-slate-500">
        <button className="hover:text-slate-800 transition-colors">Admin</button>
        <span>›</span>
        <button className="hover:text-slate-800 transition-colors">User Management</button>
        <span>›</span>
        <button className="hover:text-slate-800 transition-colors">Candidates</button>
        <span>›</span>
        <span className="text-slate-800 font-medium">{candidate.name}</span>
      </div> */}

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Banner */}
          <div className="h-24 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 relative">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
          </div>

          <div className="px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 border-4 border-white shadow-lg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {candidate.initials}
              </div>
              <div className="flex-1 pt-2 sm:pt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">
                    {candidate.name}
                  </h1>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor(candidate.status)}`}
                  >
                    {candidate.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {candidate.id}
                  </span>
                </div>
                <p className="text-slate-500 mt-0.5">{candidate.title}</p>
              </div>
              {/* Actions */}
              <div className="flex gap-2 sm:self-end">
                <button className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  Block User
                </button>
                <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                  Send Message
                </button>
              </div>
            </div>

            {/* Contact Row */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-2">
              {[
                { icon: '✉️', value: candidate.email },
                { icon: '📞', value: candidate.phone },
                { icon: '📍', value: candidate.location },
                { icon: '🔗', value: candidate.linkedin },
                { icon: '🌐', value: candidate.website },
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span>{item.icon}</span>
                  <span className="text-slate-600">{item.value}</span>
                </span>
              ))}
              <span className="flex items-center gap-1.5 ml-auto text-xs text-slate-400">
                Joined {candidate.joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-slate-100 rounded-xl p-1 w-fit shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Section title="About" icon="👤">
                <p className="text-slate-600 leading-relaxed text-sm">
                  {candidate.about}
                </p>
              </Section>

              {/* Skills */}
              <Section title="Skills" icon="⚡">
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Experience */}
              <Section title="Work Experience" icon="💼">
                <div className="space-y-5">
                  {candidate.experience.map((exp, i) => (
                    <div
                      key={exp.id}
                      className={`flex gap-4 ${i < candidate.experience.length - 1 ? 'pb-5 border-b border-slate-100' : ''}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                        🏢
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">
                              {exp.role}
                            </p>
                            <p className="text-slate-500 text-sm">
                              {exp.company}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-400">
                              {exp.duration}
                            </p>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                              {exp.type}
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Education */}
              <Section title="Education" icon="🎓">
                <div className="space-y-4">
                  {candidate.education.map((edu, i) => (
                    <div
                      key={edu.id}
                      className={`flex gap-4 ${i < candidate.education.length - 1 ? 'pb-4 border-b border-slate-100' : ''}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-lg flex-shrink-0">
                        🏛️
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">
                              {edu.degree}
                            </p>
                            <p className="text-slate-500 text-sm">
                              {edu.institution}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-400">{edu.year}</p>
                            <p className="text-xs font-medium text-emerald-600">
                              {edu.grade}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <Section title="Summary" icon="📊">
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    label="Total Applications"
                    value={candidate.stats.totalApplications}
                    color="border-indigo-100 bg-indigo-50 text-indigo-700"
                  />
                  <StatCard
                    label="Interviews Attended"
                    value={candidate.stats.totalInterviews}
                    color="border-violet-100 bg-violet-50 text-violet-700"
                  />
                  <StatCard
                    label="Shortlisted"
                    value={candidate.stats.shortlisted}
                    color="border-emerald-100 bg-emerald-50 text-emerald-700"
                  />
                  <StatCard
                    label="Rejected"
                    value={candidate.stats.rejected}
                    color="border-red-100 bg-red-50 text-red-700"
                  />
                  <StatCard
                    label="Pending"
                    value={candidate.stats.pending}
                    color="border-amber-100 bg-amber-50 text-amber-700"
                  />
                  <StatCard
                    label="Hired"
                    value={candidate.stats.hired}
                    color="border-slate-100 bg-slate-50 text-slate-600"
                  />
                </div>
              </Section>

              {/* Quick Actions */}
              <Section title="Admin Actions" icon="⚙️">
                <div className="space-y-2">
                  {[
                    {
                      label: 'Download Resume',
                      icon: '⬇️',
                      style:
                        'text-indigo-600 border-indigo-100 hover:bg-indigo-50',
                    },
                    {
                      label: 'Assign to Job',
                      icon: '📋',
                      style:
                        'text-violet-600 border-violet-100 hover:bg-violet-50',
                    },
                    {
                      label: 'Schedule Interview',
                      icon: '📅',
                      style:
                        'text-emerald-600 border-emerald-100 hover:bg-emerald-50',
                    },
                    {
                      label: 'Mark as Blacklisted',
                      icon: '🚫',
                      style: 'text-red-600 border-red-100 hover:bg-red-50',
                    },
                    {
                      label: 'Export Profile',
                      icon: '📤',
                      style:
                        'text-slate-600 border-slate-200 hover:bg-slate-50',
                    },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${action.style}`}
                    >
                      <span>{action.icon}</span>
                      {action.label}
                    </button>
                  ))}
                </div>
              </Section>

              {/* Contact Info */}
              <Section title="Contact Details" icon="📬">
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Email', value: candidate.email, icon: '✉️' },
                    { label: 'Phone', value: candidate.phone, icon: '📞' },
                    {
                      label: 'Location',
                      value: candidate.location,
                      icon: '📍',
                    },
                    {
                      label: 'LinkedIn',
                      value: candidate.linkedin,
                      icon: '🔗',
                    },
                    { label: 'Website', value: candidate.website, icon: '🌐' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">
                          {item.label}
                        </p>
                        <p className="text-slate-700">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'Applications' && (
          <Section title="All Applications" icon="📋">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    {[
                      '#',
                      'Role',
                      'Company',
                      'Applied On',
                      'Status',
                      'Action',
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-3 pr-4"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {candidate.applications.map((app, i) => (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-3.5 pr-4 text-slate-400 font-mono text-xs">
                        {i + 1}
                      </td>
                      <td className="py-3.5 pr-4 font-medium text-slate-800">
                        {app.role}
                      </td>
                      <td className="py-3.5 pr-4 text-slate-500">
                        {app.company}
                      </td>
                      <td className="py-3.5 pr-4 text-slate-400">{app.date}</td>
                      <td className="py-3.5 pr-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor(app.status)}`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <button className="text-indigo-600 text-xs font-medium hover:underline">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Interviews Tab */}
        {activeTab === 'Interviews' && (
          <Section title="Interview History" icon="🎤">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    {[
                      '#',
                      'Role',
                      'Company',
                      'Date',
                      'Round',
                      'Result',
                      'Action',
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-3 pr-4"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {candidate.interviews.map((inv, i) => (
                    <tr
                      key={inv.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-3.5 pr-4 text-slate-400 font-mono text-xs">
                        {i + 1}
                      </td>
                      <td className="py-3.5 pr-4 font-medium text-slate-800">
                        {inv.role}
                      </td>
                      <td className="py-3.5 pr-4 text-slate-500">
                        {inv.company}
                      </td>
                      <td className="py-3.5 pr-4 text-slate-400">{inv.date}</td>
                      <td className="py-3.5 pr-4 text-slate-500">
                        {inv.round}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor(inv.result)}`}
                        >
                          {inv.result}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <button className="text-indigo-600 text-xs font-medium hover:underline">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Resumes Tab */}
        {activeTab === 'Resumes' && (
          <Section title="Uploaded Resumes" icon="📄">
            <div className="space-y-3">
              {candidate.resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    📄
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-800 text-sm truncate">
                        {resume.name}
                      </p>
                      {resume.isPrimary && (
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold flex-shrink-0">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Uploaded on {resume.uploadedOn} · {resume.size}
                    </p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
                      Preview
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
