import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/sidebar';
import { WorkerDashboard } from './components/dashboard';
import { ProfilePage } from './components/profile';
import { SettingsPage } from './components/settings';
import { DailyTasksPage } from './components/tasks';
import { ActiveSitesPage } from './components/activate-sites';
import { SHARED_PROJECTS, Project } from './data/projects';
import { api } from '../src/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState<Project[]>(SHARED_PROJECTS);

  useEffect(() => {
    api.getProjects().then(data => {
      if (data.length > 0) {
        const mapped = data.map((p: any) => ({
          ...p,
          dueDate: p.due_date || p.dueDate,
          crewSize: p.crew_size || p.crewSize || 0,
          nextMilestone: p.next_milestone || p.nextMilestone || 'TBD',
          sitePhotos: p.sitePhotos || []
        }));
        setProjects(mapped);
      }
    }).catch(() => setProjects(SHARED_PROJECTS));
  }, []);

  const updateProgress = (id: string, newProgress: number) => {
    const progress = Math.min(100, Math.max(0, newProgress));
    api.updateProgress(id, progress).then(() => {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, progress } : p));
    });
  };

  const addPhoto = (id: string, photoUrl: string) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, sitePhotos: [photoUrl, ...(p.sitePhotos || [])] } : p
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <WorkerDashboard 
            projects={projects} 
            onUpdateProgress={updateProgress} 
            onAddPhoto={addPhoto} 
          />
        );
      case 'tasks':
        return <DailyTasksPage />;
      case 'projects':
        return <ActiveSitesPage projects={projects} />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <WorkerDashboard 
            projects={projects} 
            onUpdateProgress={updateProgress} 
            onAddPhoto={addPhoto} 
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-white text-slate-900 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
}
