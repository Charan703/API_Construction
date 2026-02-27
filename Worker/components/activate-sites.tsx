import React from 'react';
import { motion } from 'framer-motion';
import { 
  Hammer, 
  MapPin, 
  Users, 
  ChevronRight, 
  HardHat,
  TrendingUp,
  ExternalLink,
  Target
} from 'lucide-react';
import { ImageWithFallback } from './image-with-fallback';
import { Project } from '../data/projects';

interface ActiveSitesProps {
  projects: Project[];
}

export function ActiveSitesPage({ projects }: ActiveSitesProps) {
  return (
    <div className="flex-1 overflow-auto bg-[#f8fafc] p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Hammer className="w-8 h-8 text-blue-600" />
              Active Construction Sites
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Detailed site mapping and logistical overview for BuildPro API projects.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all text-sm shadow-sm flex items-center gap-2">
                <Target className="w-4 h-4" />
                GPS Map View
             </button>
             <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-600/20 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Regional Report
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((site, index) => (
            <motion.div 
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-xl transition-all group flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <ImageWithFallback 
                  src={site.image} 
                  alt={site.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                    site.health === 'On Track' ? 'bg-green-500 text-white' :
                    site.health === 'Delayed' ? 'bg-amber-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {site.health}
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg text-slate-800">
                    {site.status}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                   <div className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg flex items-center gap-2 border border-white/20">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold leading-none uppercase">Crew Size</p>
                        <p className="text-sm font-black text-slate-900">{site.crewSize}</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{site.name}</h3>
                    <div className="flex items-center gap-1 text-slate-400 mt-1 text-sm font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{site.location}</span>
                    </div>
                  </div>
                  <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <HardHat className="w-4 h-4 text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Site Lead</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 truncate">{site.supervisor}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Milestone</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 truncate">{site.nextMilestone}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                   <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${site.id}${i}`} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
                        +{site.crewSize - 4}
                      </div>
                   </div>
                   <button className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                      Full Site Logistics <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
