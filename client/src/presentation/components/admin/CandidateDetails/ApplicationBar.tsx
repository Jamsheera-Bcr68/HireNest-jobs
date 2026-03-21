import React from 'react';
import { Section } from './Section';
import type { UserProfileType } from '../../../../types/dtos/profileTypes/userTypes';

type Props = {
  candidate: UserProfileType;
};
function ApplicationBar({ candidate }: Props) {
  return (
    <div>
      {/* Applications Tab */}

      <Section title="All Applications" icon="📋">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['#', 'Role', 'Company', 'Applied On', 'Status', 'Action'].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-3 pr-4"
                    >
                      {h}
                    </th>
                  )
                )}
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
                  <td className="py-3.5 pr-4 text-slate-500">{app.company}</td>
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
    </div>
  );
}

export default ApplicationBar;
