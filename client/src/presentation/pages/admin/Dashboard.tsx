import React from 'react';

import Statistics from '../../components/admin/dashboard/Statistics';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8  lg:grid-cols-3">
        <Statistics />
      </div>
    </div>
  );
};

export default Dashboard;
