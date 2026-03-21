import React from 'react';

function RecentActivities() {
  return (
    <div>
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activities
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 pb-4 border-b">
            <div className="bg-green-100 rounded-full p-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">
                New employer registered
              </p>
              <p className="text-gray-500 text-sm">
                Tech Solutions Inc. joined
              </p>
            </div>
            <span className="text-gray-400 text-sm">5 min ago</span>
          </div>

          <div className="flex items-center space-x-4 pb-4 border-b">
            <div className="bg-purple-100 rounded-full p-2">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">New job posted</p>
              <p className="text-gray-500 text-sm">
                Senior Developer - Google India
              </p>
            </div>
            <span className="text-gray-400 text-sm">12 min ago</span>
          </div>

          <div className="flex items-center space-x-4 pb-4 border-b">
            <div className="bg-blue-100 rounded-full p-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">
                New candidate registered
              </p>
              <p className="text-gray-500 text-sm">Rajesh Kumar signed up</p>
            </div>
            <span className="text-gray-400 text-sm">25 min ago</span>
          </div>

          <div className="flex items-center space-x-4 pb-4 border-b">
            <div className="bg-orange-100 rounded-full p-2">
              <svg
                className="w-5 h-5 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">Multiple applications</p>
              <p className="text-gray-500 text-sm">
                15 new applications received
              </p>
            </div>
            <span className="text-gray-400 text-sm">1 hour ago</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-red-100 rounded-full p-2">
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">Reported job post</p>
              <p className="text-gray-500 text-sm">
                Job ID #4521 flagged - Needs review
              </p>
            </div>
            <span className="text-gray-400 text-sm">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentActivities;
