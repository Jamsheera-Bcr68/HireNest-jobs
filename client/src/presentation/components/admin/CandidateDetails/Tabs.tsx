import React from 'react';

const tabs = ['Overview', 'Applications', 'Interviews'];
type Props = {
  handleTabChange: (tab: string) => void;
  activeTab: string;
};
function Tabs({ handleTabChange, activeTab }: Props) {
  return (
    <div>
      <div className="flex gap-1 bg-white mt-4 border rounded-xl p-1 w-full justify-center shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-5 py-2 text-sm font-medium transition-all ${
              activeTab === tab
                ? ' text-indigo-700 border-b-2  border-indigo-700'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
