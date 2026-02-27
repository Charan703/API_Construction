import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  HardHat,
  Plus,
  Hammer,
  MapPin,
  Calendar,
  Camera,
  Upload,
  X,
  Sparkles,
  Loader2
} from 'lucide-react';
import { ImageWithFallback } from './image-with-fallback';
import { Project } from '../data/projects';
import { api } from '../../src/api';

interface DashboardProps {
  projects: Project[];
  onUpdateProgress: (id: string, newProgress: number) => void;
  onAddPhoto: (id: string, photoUrl: string) => void;
}

export function WorkerDashboard({ projects, onUpdateProgress, onAddPhoto }: DashboardProps) {
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleFileUpload = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId(projectId);
    
    api.uploadPhoto(projectId, file).then(data => {
      onAddPhoto(projectId, data.photo_url);
      setUploadingId(null);
    }).catch(() => {
      const mockUrl = URL.createObjectURL(file);
      onAddPhoto(projectId, mockUrl);
      setUploadingId(null);
    });
  };

  const stats = [
    { label: 'Active Sites', value: projects.length.toString(), icon: HardHat, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Inspections Passed', value: '18', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
    { label: 'Work Hours', value: '240h', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Safety Alerts', value: '0', icon: AlertCircle, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100' },
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#f8fafc] p-8">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Field Dashboard</h1>
          <p className="text-slate-500 mt-2 font-medium">Welcome back, Mike. Log daily progress photos for AI analysis.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Log Site Report</span>
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} border ${stat.border} transition-transform group-hover:scale-110`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Hammer className="w-5 h-5 text-blue-600" />
              Current Projects
            </h2>
            <button className="text-blue-600 font-bold text-sm hover:underline">View Site Map</button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => (
              <motion.div 
                layout
                key={project.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 flex flex-col gap-6 hover:border-blue-200 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-36 rounded-xl overflow-hidden flex-shrink-0 relative group">
                    <ImageWithFallback 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs font-bold flex items-center gap-1">
                         <MapPin className="w-3 h-3" /> {project.location}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-slate-900 truncate">{project.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{project.location}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-sm border ${
                          project.status === 'Foundation' ? 'bg-sky-100 text-sky-700 border-sky-200' :
                          project.status === 'Framing' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          project.status === 'Planning' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                          'bg-indigo-100 text-indigo-700 border-indigo-200'
                        }`}>
                          {project.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="mt-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-slate-700 tracking-tight">Phase Progress</span>
                          <span className="text-sm font-black text-blue-600">{project.progress}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                          <motion.div 
                            initial={false}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>Due: {project.dueDate}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button 
                            onClick={() => onUpdateProgress(project.id, project.progress - 5)}
                            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors border-r border-slate-200"
                          >
                            -
                          </button>
                          <button 
                            onClick={() => onUpdateProgress(project.id, project.progress + 5)}
                            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-green-50 hover:text-green-500 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="bg-slate-900 text-white font-bold px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-all text-sm shadow-sm"
                        >
                          Manual Sync
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-bold text-slate-700">Daily Site Logs</h4>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded flex items-center gap-1 font-bold">
                        <Sparkles className="w-3 h-3" /> AI READY
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic font-medium">Upload photos for AI-driven progress tracking</p>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="relative flex-shrink-0">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        id={`file-upload-${project.id}`}
                        onChange={(e) => handleFileUpload(project.id, e)}
                      />
                      <button 
                        onClick={() => document.getElementById(`file-upload-${project.id}`)?.click()}
                        disabled={uploadingId === project.id}
                        className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all group"
                      >
                        {uploadingId === project.id ? (
                          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                        ) : (
                          <>
                            <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                            <span className="text-[10px] font-bold">Upload</span>
                          </>
                        )}
                      </button>
                    </div>

                    {project.sitePhotos.map((photo, i) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={i} 
                        className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative group"
                      >
                        <ImageWithFallback 
                          src={photo} 
                          alt="Site Log" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="text-white p-1 hover:text-red-400 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}

                    {project.sitePhotos.length === 0 && !uploadingId && (
                      <div className="flex-1 flex items-center justify-center text-slate-300 italic text-xs border border-slate-100 rounded-xl px-4">
                        No photos uploaded for today's log yet.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group">
            <div className="relative z-10">
              <Sparkles className="w-8 h-8 mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">AI Analysis Status</h3>
              <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                Site photos are automatically analyzed to verify phase completion and update client portals.
              </p>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg w-fit">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">Engine: Active</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform" />
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-2">Site Log</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:border-l-2 before:border-slate-100">
              {[
                { label: 'Framing Phase', val: '72', time: '2 hours ago', icon: Hammer },
                { label: 'Excavation Done', val: '35', time: '5 hours ago', icon: HardHat },
                { label: 'Wiring Complete', val: '95', time: 'Yesterday', icon: CheckCircle2 },
                { label: 'Site Cleared', val: '100', time: '2 days ago', icon: MapPin }
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <activity.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 pt-1">
                    <p className="text-sm text-slate-900 font-bold leading-tight">
                      {activity.label} <span className="text-blue-600">@{activity.val}%</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-sm font-bold text-slate-500 hover:text-blue-600 border border-slate-100 rounded-xl hover:bg-blue-50 transition-all">
              View All Site Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
