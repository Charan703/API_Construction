import React from 'react';
import { PageHeader } from './PageHeader';
import { HardHat, AlertTriangle, CheckCircle2, FileText, Calendar, Plus, ExternalLink } from 'lucide-react';

interface ConstructionSpecificViewProps {
  type: 'reports' | 'safety' | 'resources';
}

export function ConstructionSpecificView({ type }: ConstructionSpecificViewProps) {
  const titles = {
    reports: 'Daily Site Reports',
    safety: 'Safety & Compliance Logs',
    resources: 'Equipment & Inventory'
  };

  const descriptions = {
    reports: 'Review and log daily progress, labor, and weather conditions',
    safety: 'Monitor site safety standards and incident reporting',
    resources: 'Track heavy machinery and material inventory levels'
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={titles[type]} 
        description={descriptions[type]}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            {type === 'safety' ? 'New Inspection' : 'Add Entry'}
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {type === 'safety' && (
          <>
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-600 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold">Compliance Rate</span>
              </div>
              <p className="text-2xl font-bold text-emerald-900">98.4%</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-bold">Open Hazards</span>
              </div>
              <p className="text-2xl font-bold text-amber-900">3</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-bold">Last Inspection</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">Today, 08:30</p>
            </div>
          </>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Recent {titles[type]}</h3>
          <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
        </div>
        <div className="p-0">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold">
                  {type === 'safety' ? 'S' : 'R'}{i}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {type === 'safety' ? `Inspection - Zone ${i+2}` : `Daily Report - Feb ${11-i}, 2026`}
                  </p>
                  <p className="text-xs text-slate-500">Logged by Marcus Chen • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                  Completed
                </span>
                <button className="p-2 text-slate-400 hover:text-slate-600">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
