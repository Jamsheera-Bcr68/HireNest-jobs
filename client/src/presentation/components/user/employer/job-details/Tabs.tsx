import React from 'react';

type Props = {
  tabs: { id: string; label: string }[];
  setTab: (data: string) => void;
  tab: string;
};
function Tabs({ tabs, setTab, tab }: Props) {
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
                ? 'border-blue-600 text-blue-600'
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
