import React from 'react';

function Activity() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Platform Activity
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Jobs Posted</span>
          <span className="font-medium">12</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Applications</span>
          <span className="font-medium">340</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Joined</span>
          <span className="font-medium">Jan 2024</span>
        </div>
      </div>
    </div>
  );
}

export default Activity;
