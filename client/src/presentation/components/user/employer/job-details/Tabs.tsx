import React from 'react';
import type { UserRole } from '../../../../../constants/types/user';

type Props = {
  tabs: { id: string; label: string }[];
  setTab: (data: string) => void;
  tab: string;
  role:UserRole
};
function Tabs({ tabs, setTab, tab,role }: Props) {

  return (
    <div>
      {/* Tab strip */}
      <div className="flex border-b border-gray-100 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors -mb-px ${
              tab === t.id
                ? `${role==='admin'?'border-blue-600 text-blue-600':'border-fuchsia-600 text-fuchsia-600'}`
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
