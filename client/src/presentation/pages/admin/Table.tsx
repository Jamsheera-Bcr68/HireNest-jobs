import { useEffect, useState } from 'react';
import type { CompanyProfileType } from '../../../types/dtos/profileTypes/userTypes';
import { Eye, Trash, SquarePen } from 'lucide-react';
import { companyService } from '../../../services/apiServices/companyService';

const tabs = ['All', 'Active', 'Pending', 'Suspended'];
const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  suspended: 'bg-red-50 text-red-600 border border-red-200',
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  rejected: 'bg-red-50 text-red-600 border border-red-200',
};
type Props = {
  companies: CompanyProfileType[] | [];
};
function Table({ companies }: Props) {
  const [activeTab, setActiveTab] = useState('All');
  const [filtered, setFiltered] = useState<CompanyProfileType[] | []>([]);
  useEffect(() => {
    setFiltered(companies);
  }, [companies]);
  async function getCompanies(filter: string) {
    const data = await companyService.getAllCompanies(filter);
    console.log('after filter', data.companies);
    setFiltered(data.companies);
  }
  return (
    <>
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
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
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
          {/* <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-slate-600">
                <option>All Plans</option>
                <option>Basic</option>
                <option>Premium</option>
                <option>Enterprise</option>
              </select> */}
          {/* <button className="inline-flex items-center gap-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button> */}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-1 px-5 pt-4 border-b border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                console.log('tab is ',tab);
                
                getCompanies(tab.toLowerCase());
                setActiveTab(tab);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition border-b-2 -mb-px  ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              } `}
            >
              {tab}
              <span
                className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}
              >
                {filtered.length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              {/* <th className="px-5 py-3">
                <input
                      type="checkbox"
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-400 cursor-pointer"
                      onChange={(e) =>
                       setSelectedRows(e.target.checked ? filtered.map((r) => r.id) : [])
                    }
                   checked={selectedRows.length === filtered.length && filtered.length > 0}
                    />
              </th> */}
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Company
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                Industry
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
            {filtered.map((company) => (
              <tr
                key={company.id}
                className="hover:bg-slate-50 transition group"
              >
                {/* <td className="px-5 py-4">
                  <input
                        type="checkbox"
                        // checked={selectedRows.includes(employer.id)}
                        // onChange={() => toggleRow(employer.id)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-400 cursor-pointer"
                      />
                </td> */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0`}
                    >
                      {/* {company.logoUrl} */}PF
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-800">
                          {company.companyName}
                        </span>
                        {company.isVerified && (
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
                      <p className="text-xs text-slate-400">{company.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="text-slate-600">{company.industry}</span>
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full  ${statusStyles[company.status]} `}
                  >
                    {company.status}
                  </span>
                </td>
                <td className="px-4 py-4 hidden sm:table-cell ">
                  {company.jobCount || 0}
                </td>
                <td className="px-4 py-4 hidden lg:table-cell  text-xs">
                  {new Date(company.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      // onClick={() => openModal("view", employer)}
                      className="p-1.5 text-blue-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      //onClick={() => openModal("edit", employer)}
                      className="p-1.5 text-amber-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                      title="Edit"
                    >
                      <SquarePen size={18} />
                    </button>
                    <button
                      // onClick={() => openModal("delete", employer)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash size={18} />
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
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Table;
