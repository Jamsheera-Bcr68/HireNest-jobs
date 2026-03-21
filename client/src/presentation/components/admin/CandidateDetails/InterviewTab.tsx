import React from 'react';
import type { UserProfileType } from '../../../../types/dtos/profileTypes/userTypes';
import { Section } from 'lucide-react';

function InterviewTab({ candidate }: { candidate: UserProfileType }) {
  return (
    <div>
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
                    <td className="py-3.5 pr-4 text-slate-500">{inv.round}</td>
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
    </div>
  );
}

export default InterviewTab;
