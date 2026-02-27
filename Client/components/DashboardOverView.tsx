import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  BarChart3,
  MapPin,
  Download,
  Files,
  Truck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { AIProgressTracker } from './ApiProgressTracker';

const budgetData = [
  { month: 'Jan', spent: 4000, budget: 5000 },
  { month: 'Feb', spent: 3000, budget: 5000 },
  { month: 'Mar', spent: 2000, budget: 5000 },
  { month: 'Apr', spent: 2780, budget: 5000 },
  { month: 'May', spent: 1890, budget: 5000 },
  { month: 'Jun', spent: 2390, budget: 5000 },
];

function ImageWithFallback(props: any) {
  const [didError, setDidError] = useState(false)
  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  )
}

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Project: Skyview Residences</h2>
          <div className="flex items-center gap-4 mt-2 text-slate-500">
            <span className="flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4" />
              Downtown Metropolitan Area, Block 42
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5 text-sm">
              <Calendar className="w-4 h-4" />
              Est. Completion: Nov 2026
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export Status
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
            Add Site Report
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Completion', value: '78%', sub: '+2.4% from last week', icon: TrendingUp, color: 'blue' },
          { label: 'Days Remaining', value: '245', sub: 'On Schedule', icon: Clock, color: 'emerald' },
          { label: 'Safety Incidents', value: '0', sub: 'Last 90 days', icon: CheckCircle2, color: 'indigo' },
          { label: 'Pending Approvals', value: '12', sub: 'Requires immediate action', icon: AlertCircle, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-xs text-slate-400 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Powered Progress Analysis */}
        <div className="lg:col-span-2">
          <AIProgressTracker />
        </div>

        {/* Project Image and Key Info */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="h-48 relative">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1716037999044-98a8e85dfa1a?w=600&q=80" 
              alt="Construction Site"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">
              LIVE FEED
            </div>
          </div>
          <div className="p-5 flex-1 space-y-4">
            <h4 className="font-semibold text-slate-900">Quick Details</h4>
            <div className="space-y-3">
              {[
                { label: 'Lead Architect', value: 'Marcus Chen', role: 'Main Contractor' },
                { label: 'Budget Status', value: 'On Track', role: 'Allocated: $45M' },
                { label: 'Workers On Site', value: '142', role: 'Shift B' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="text-slate-900 font-medium">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                  <span className="text-slate-700 font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-2 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 text-sm font-medium rounded-lg transition-colors">
              View All Site Details
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h4 className="font-semibold text-slate-900 mb-6">Recent Site Activity</h4>
          <div className="space-y-6">
            {[
              { user: 'Sarah Miller', action: 'Uploaded new safety inspection report', time: '2 hours ago', icon: Files, color: 'text-blue-500' },
              { user: 'Robert Wilson', action: 'Requested concrete delivery for Sector 7', time: '4 hours ago', icon: Truck, color: 'text-amber-500' },
              { user: 'System', action: 'Weekly progress goal reached (Concrete pouring)', time: '6 hours ago', icon: CheckCircle2, color: 'text-emerald-500' },
              { user: 'David Park', action: 'Reported mechanical failure on Crane 04', time: '1 day ago', icon: AlertCircle, color: 'text-red-500' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-900 font-medium">
                    <span className="font-bold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Allocation */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
           <h4 className="font-semibold text-slate-900 mb-6">Resource Allocation</h4>
           <div className="h-[250px] min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="spent" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="budget" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600" />
              <span className="text-xs text-slate-500">Spent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="text-xs text-slate-500">Budgeted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
