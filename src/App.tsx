import React, { useState } from 'react';
import ClientDashboard from '../Client/main';
import HomeDashboard from '../Home/main';
import WorkerDashboard from '../Worker/main';

type DashboardType = 'client' | 'home' | 'worker';

export default function App() {
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>('home');

  const renderDashboard = () => {
    switch (activeDashboard) {
      case 'client':
        return <ClientDashboard />;
      case 'home':
        return <HomeDashboard />;
      case 'worker':
        return <WorkerDashboard />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white p-2 rounded-lg shadow-lg">
        <button
          onClick={() => setActiveDashboard('home')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeDashboard === 'home'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => setActiveDashboard('client')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeDashboard === 'client'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Client
        </button>
        <button
          onClick={() => setActiveDashboard('worker')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeDashboard === 'worker'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Worker
        </button>
      </div>
      {renderDashboard()}
    </div>
  );
}
