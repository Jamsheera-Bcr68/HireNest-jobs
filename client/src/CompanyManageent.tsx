import { useState } from 'react';

const employers = [
  {
    id: 1,
    name: 'TechNova Solutions',
    email: 'hr@technova.com',
    industry: 'Technology',
    plan: 'Premium',
    status: 'Active',
    jobs: 12,
    joined: 'Jan 12, 2024',
    logo: 'TN',
    verified: true,
  },
  {
    id: 2,
    name: 'GreenBuild Corp',
    email: 'admin@greenbuild.com',
    industry: 'Construction',
    plan: 'Basic',
    status: 'Active',
    jobs: 5,
    joined: 'Mar 3, 2024',
    logo: 'GB',
    verified: true,
  },
  {
    id: 3,
    name: 'MediCare Plus',
    email: 'recruit@medicareplus.com',
    industry: 'Healthcare',
    plan: 'Enterprise',
    status: 'Suspended',
    jobs: 0,
    joined: 'Nov 20, 2023',
    logo: 'MP',
    verified: false,
  },
  {
    id: 4,
    name: 'Apex Logistics',
    email: 'hr@apexlogistics.com',
    industry: 'Logistics',
    plan: 'Premium',
    status: 'Active',
    jobs: 8,
    joined: 'Feb 14, 2024',
    logo: 'AL',
    verified: true,
  },
  {
    id: 5,
    name: 'BrightMinds Edu',
    email: 'jobs@brightminds.com',
    industry: 'Education',
    plan: 'Basic',
    status: 'Pending',
    jobs: 2,
    joined: 'Apr 1, 2024',
    logo: 'BE',
    verified: false,
  },
  {
    id: 6,
    name: 'Skyline Finance',
    email: 'talent@skylinefin.com',
    industry: 'Finance',
    plan: 'Enterprise',
    status: 'Active',
    jobs: 19,
    joined: 'Dec 5, 2023',
    logo: 'SF',
    verified: true,
  },
];

const stats = [
  {
    label: 'Total Employers',
    value: '1,284',
    change: '+8.2%',
    up: true,
    icon: '🏢',
  },
  {
    label: 'Active This Month',
    value: '943',
    change: '+5.1%',
    up: true,
    icon: '✅',
  },
  {
    label: 'Pending Approval',
    value: '37',
    change: '+12',
    up: false,
    icon: '⏳',
  },
  { label: 'Suspended', value: '21', change: '-3', up: true, icon: '🚫' },
];

const logoColors = {
  TN: 'bg-blue-100 text-blue-700',
  GB: 'bg-green-100 text-green-700',
  MP: 'bg-red-100 text-red-700',
  AL: 'bg-orange-100 text-orange-700',
  BE: 'bg-yellow-100 text-yellow-700',
  SF: 'bg-indigo-100 text-indigo-700',
};

const planStyles = {
  Basic: 'bg-slate-100 text-slate-600',
  Premium: 'bg-blue-50 text-blue-700',
  Enterprise: 'bg-violet-50 text-violet-700',
};

const tabs = ['All', 'Active', 'Pending', 'Suspended'];

export default function EmployerManagement() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [modalType, setModalType] = useState('');

  const filtered = employers.filter((e) => {
    const matchTab = activeTab === 'All' || e.status === activeTab;
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.industry.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  // const toggleRow = (id) => {
  //   setSelectedRows((prev) =>
  //     prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
  //   );
  // };

  const openModal = (type: string, employer = null) => {
    setModalType(type);
    setSelectedEmployer(employer);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Nav */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">J</span>
          </div>
          <span className="text-slate-800 font-bold text-lg tracking-tight">
            JobAdmin
          </span>
          <span className="hidden sm:inline text-slate-300 mx-2">|</span>
          <span className="hidden sm:inline text-slate-500 text-sm">
            Employer Management
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
            A
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Employer Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage all registered employers on the platform
            </p>
          </div>
          <button
            onClick={() => openModal('add')}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Employer
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{s.icon}</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}
                >
                  {s.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Table Controls */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search employers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent bg-slate-50"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-slate-600">
                <option>All Industries</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Education</option>
              </select>
              <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-slate-600">
                <option>All Plans</option>
                <option>Basic</option>
                <option>Premium</option>
                <option>Enterprise</option>
              </select>
              <button className="inline-flex items-center gap-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 px-5 pt-4 border-b border-slate-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
                <span
                  className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}
                >
                  {tab === 'All'
                    ? employers.length
                    : employers.filter((e) => e.status === tab).length}
                </span>
              </button>
            ))}
          </div>

          {/* Bulk Action Bar */}
          {selectedRows.length > 0 && (
            <div className="px-5 py-3 bg-indigo-50 border-b border-indigo-100 flex items-center gap-3 text-sm">
              <span className="text-indigo-700 font-medium">
                {selectedRows.length} selected
              </span>
              <button className="text-emerald-700 hover:underline font-medium">
                Activate
              </button>
              <button className="text-amber-700 hover:underline font-medium">
                Suspend
              </button>
              <button className="text-red-600 hover:underline font-medium">
                Delete
              </button>
              <button
                onClick={() => setSelectedRows([])}
                className="ml-auto text-slate-500 hover:text-slate-700"
              >
                ✕ Clear
              </button>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-400 cursor-pointer"
                      // onChange={(e) =>
                      //   setSelectedRows(e.target.checked ? filtered.map((r) => r.id) : [])
                      // }
                      checked={
                        selectedRows.length === filtered.length &&
                        filtered.length > 0
                      }
                    />
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Employer
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                    Industry
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                    Plan
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">
                    Jobs
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                    Joined
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((employer) => (
                  <tr
                    key={employer.id}
                    className="hover:bg-slate-50 transition group"
                  >
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        // checked={selectedRows.includes(employer.id)}
                        // onChange={() => toggleRow(employer.id)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-400 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0  `}
                          // ${logoColors[employer.logo]}
                        >
                          {employer.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800">
                              {employer.name}
                            </span>
                            {employer.verified && (
                              <svg
                                className="w-4 h-4 text-blue-500 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">
                            {employer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-slate-600">
                        {employer.industry}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full`}
                        //  ${planStyles[employer.plan]}
                      >
                        {employer.plan}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full    `}
                        // ${statusStyles[employer.status]}
                      >
                        {employer.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell text-slate-600">
                      {employer.jobs}
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell text-slate-400 text-xs">
                      {employer.joined}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          // onClick={() => openModal('view', employer)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="View"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          //  onClick={() => openModal('edit', employer)}
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                          title="Edit"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          //onClick={() => openModal('delete', employer)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-medium text-slate-500">No employers found</p>
                <p className="text-sm mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
            <span>
              Showing{' '}
              <span className="font-medium text-slate-700">
                {filtered.length}
              </span>{' '}
              of{' '}
              <span className="font-medium text-slate-700">
                {employers.length}
              </span>{' '}
              employers
            </span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition disabled:opacity-40">
                ← Prev
              </button>
              <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-medium">
                1
              </button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                2
              </button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                3
              </button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                {/* {modalType === 'view' && `${selectedEmployer?.name}`} */}
                {modalType === 'edit' && `Edit Employer`}
                {modalType === 'add' && `Add New Employer`}
                {modalType === 'delete' && `Delete Employer`}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5">
              {/* View Modal */}
              {modalType === 'view' && selectedEmployer && (
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold `}
                      //${logoColors[selectedEmployer.logo]}
                    >
                      {/* {selectedEmployer.logo} */}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-900">
                          {/* {selectedEmployer.name} */}
                        </h3>
                        {selectedEmployer && (
                          <span className="text-blue-500 text-xs bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      {/* <p className="text-slate-500 text-sm">
                        {selectedEmployer.email}
                      </p> */}
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Industry', value: selectedEmployer.industry },
                      { label: 'Plan', value: selectedEmployer.plan },
                      { label: 'Status', value: selectedEmployer.status },
                      { label: 'Active Jobs', value: selectedEmployer.jobs },
                      { label: 'Joined', value: selectedEmployer.joined },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-slate-50 rounded-xl p-3"
                      >
                        <p className="text-xs text-slate-400 uppercase font-medium tracking-wide">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-slate-800 mt-0.5">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div> */}
                  <div className="pt-2 border-t border-slate-100 flex gap-2">
                    <button className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition">
                      View All Jobs
                    </button>
                    <button className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold transition">
                      Send Message
                    </button>
                  </div>
                </div>
              )}

              {/* Add / Edit Modal */}
              {/* {(modalType === 'add' || modalType === 'edit') && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                        Company Name
                      </label>
                      <input
                        defaultValue={selectedEmployer?.name}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="e.g. Acme Corp"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                        Contact Email
                      </label>
                      <input
                        defaultValue={selectedEmployer?.email}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="hr@company.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                        Phone
                      </label>
                      <input
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                        Industry
                      </label>
                      <select
                        defaultValue={selectedEmployer?.industry}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                      >
                        <option>Technology</option>
                        <option>Healthcare</option>
                        <option>Finance</option>
                        <option>Education</option>
                        <option>Construction</option>
                        <option>Logistics</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                        Plan
                      </label>
                      <select
                        defaultValue={selectedEmployer?.plan}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                      >
                        <option>Basic</option>
                        <option>Premium</option>
                        <option>Enterprise</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                        Status
                      </label>
                      <select
                        defaultValue={selectedEmployer?.status}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                      >
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Suspended</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                        Website
                      </label>
                      <input
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="https://company.com"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                        Notes
                      </label>
                      <textarea
                        rows={2}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                        placeholder="Internal admin notes..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold transition"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition">
                      {modalType === 'add' ? 'Add Employer' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )} */}

              {/* Delete Modal */}
              {/* {modalType === 'delete' && (
                <div className="text-center space-y-4">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto text-2xl">
                    🗑️
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold">
                      Delete{' '}
                      <span className="text-red-600">
                        {selectedEmployer?.name}
                      </span>
                      ?
                    </p>
                    <p className="text-slate-500 text-sm mt-1">
                      This will permanently remove the employer and all
                      associated job listings. This action cannot be undone.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold transition"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition">
                      Yes, Delete
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
