import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { DocumentsView } from './components/DocumentView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { TeamView } from './components/TeamView';
import { ResourcesView } from './components/ResourcesView';
import { SupportServicesView } from './components/SupportServiceView';
import { ConstructionSpecificView } from './components/ConstructionSpecificView';
import { Bell, Search, HelpCircle } from 'lucide-react';

export default function ConstructionDashboard({ 
  projectName = "Skyview Residences",
  userName = "Marcus Chen"
}) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'documents':
        return <DocumentsView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      case 'reports':
        return <ConstructionSpecificView type="reports" />;
      case 'safety':
        return <ConstructionSpecificView type="safety" />;
      case 'resources':
        return <ResourcesView />;
      case 'team':
        return <TeamView />;
      case 'support':
        return <SupportServicesView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search project, reports, tasks..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-2" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{userName}</p>
                <p className="text-xs text-slate-500">Project Architect</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1746899603348-ab9afd71e16d?w=100&q=80" 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}


