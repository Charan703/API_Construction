import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { 
  Bell, 
  Search, 
  Plus, 
  MoreHorizontal, 
  TrendingUp, 
  TrendingDown,
  Users as UsersIcon,
  Briefcase,
  Calendar as CalendarIcon,
  UserCircle,
  LayoutDashboard,
  Settings,
  Star,
  CheckCircle2,
  HardHat,
  ShieldCheck,
  ChevronDown,
  Package,
  Activity,
  Truck,
  Building2,
  ClipboardCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Mock Data ---

const MOCK_BUILDERS = [
  {
    id: 1,
    name: 'John Structure',
    business: 'Safe Foundations',
    specialty: 'Structure',
    projects: 12,
    rating: 4.8,
    reviews: 45,
    status: 'Approved',
    initials: 'JS',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    applied: 'Sep 28, 2023',
    docs: 'Verified',
    color: 'bg-blue-100 text-blue-600',
    summary: 'Specializing in reinforced concrete structures and industrial foundations with over 15 years of experience.'
  },
  {
    id: 2,
    name: 'Alice Build',
    business: 'Modern Homes Co',
    specialty: 'Interior',
    projects: 8,
    rating: 4.9,
    reviews: 32,
    status: 'Approved',
    initials: 'AB',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    applied: 'Sep 30, 2023',
    docs: 'Verified',
    color: 'bg-purple-100 text-purple-600',
    summary: 'Expert in high-end residential interiors, focusing on sustainable materials and modern aesthetics.'
  },
  {
    id: 3,
    name: 'Gary House',
    business: 'Precision Plumbing',
    specialty: 'Plumbing',
    projects: 10,
    rating: 4.6,
    reviews: 29,
    status: 'Approved',
    initials: 'GH',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    applied: 'Aug 15, 2023',
    docs: 'Verified',
    color: 'bg-emerald-100 text-emerald-600',
    summary: 'Specialist in commercial plumbing systems and energy-efficient water heating solutions.'
  },
  {
    id: 4,
    name: 'Ian Joiner',
    business: 'Luxury Landscapes',
    specialty: 'Landscaping',
    projects: 6,
    rating: 5.0,
    reviews: 14,
    status: 'Approved',
    initials: 'IJ',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    applied: 'Jul 22, 2023',
    docs: 'Verified',
    color: 'bg-amber-100 text-amber-600',
    summary: 'Landscape architect focused on drought-resistant gardens and luxury outdoor living spaces.'
  },
  {
    id: 5,
    name: 'Mike Hammer',
    business: 'Hammer Construction Ltd',
    specialty: 'General',
    projects: 0,
    rating: 0,
    reviews: 0,
    status: 'Pending',
    initials: 'MH',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    applied: 'Oct 12, 2023',
    docs: '3/3 Uploaded',
    color: 'bg-blue-100 text-blue-600',
    summary: 'Expert in residential renovations and site preparation.'
  },
  {
    id: 6,
    name: 'Linda Mason',
    business: 'Masonry Pro',
    specialty: 'Masonry',
    projects: 0,
    rating: 0,
    reviews: 0,
    status: 'Pending',
    initials: 'LM',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    applied: 'Oct 13, 2023',
    docs: '2/3 Uploaded',
    color: 'bg-orange-100 text-orange-600',
    summary: 'Expert in traditional brickwork and decorative stonemasonry.'
  },
  {
    id: 7,
    name: 'Steve Works',
    business: 'Precision Build',
    specialty: 'Finishing',
    projects: 0,
    rating: 0,
    reviews: 0,
    status: 'Pending',
    initials: 'SW',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    applied: 'Oct 14, 2023',
    docs: '3/3 Uploaded',
    color: 'bg-purple-100 text-purple-600',
    summary: 'Focused on high-end interior finishing and cabinetry.'
  },
  {
    id: 8,
    name: 'Dave Sketchy',
    business: 'Cheap Builds Inc',
    specialty: 'Structural',
    projects: 1,
    rating: 1.5,
    reviews: 2,
    status: 'Rejected',
    initials: 'DS',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    applied: 'Oct 01, 2023',
    docs: 'Missing ID',
    color: 'bg-red-100 text-red-600',
    summary: 'Application rejected due to invalid documentation and safety concerns.'
  }
];

// --- Components ---

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

const Header = ({ title, avatarUrl }: { title: string, avatarUrl: string }) => (
  <header className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-bold text-gray-900 capitalize tracking-tight">{title}</h1>
    </div>
    <div className="flex items-center gap-3">
      <div className="relative group hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-gray-50 border border-transparent rounded-lg pl-9 pr-4 py-1.5 text-sm w-48 md:w-64 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
        />
      </div>
      <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <div className="w-px h-6 bg-gray-200 mx-1"></div>
      <div className="flex items-center gap-3 pl-1 cursor-pointer group">
        <ImageWithFallback 
          src={avatarUrl} 
          className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-100 transition-all"
          alt="User avatar"
        />
        <div className="hidden lg:block text-left">
          <p className="text-sm font-semibold text-gray-900 leading-none">Alex Johnson</p>
          <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider font-medium">Administrator</p>
        </div>
      </div>
    </div>
  </header>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm ${className}`}>
    {children}
  </div>
);

const DashboardView = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Active Projects', value: '12', change: '+2', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Total Builders', value: '48', change: '+12%', icon: HardHat, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Number of Clients', value: '156', change: '+12', icon: UsersIcon, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Support Requests', value: '24', change: '-5', icon: Bell, color: 'text-indigo-500', bg: 'bg-indigo-50' },
      ].map((stat, i) => (
        <Card key={i} className="hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between mb-6">
            <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110`}>
              <stat.icon size={20} />
            </div>
            <button className="text-gray-300 hover:text-gray-600 p-1 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div>
            <p className="text-[14px] font-medium text-gray-500 tracking-tight">{stat.label}</p>
            <h3 className="text-[28px] font-bold text-gray-900 mt-1 leading-none">{stat.value}</h3>
            <div className="flex items-center gap-2 mt-4">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                {stat.change}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">vs last month</span>
            </div>
          </div>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card className="xl:col-span-2">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Site Activity</h3>
            <p className="text-sm text-gray-500 mt-1">Real-time updates from your construction sites</p>
          </div>
          <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all">View all</button>
        </div>
        <div className="space-y-6">
          {[
            { title: 'Concrete pouring completed at Villa Project', time: 'Today at 08:30 AM', category: 'Phase Update', color: 'bg-blue-50 text-blue-700' },
            { title: 'New material shipment: Steel Beams (12 tons)', time: 'Today at 11:45 AM', category: 'Logistics', color: 'bg-orange-50 text-orange-700' },
            { title: 'Safety inspection passed: Modern Loft Site', time: 'Yesterday at 03:20 PM', category: 'Compliance', color: 'bg-emerald-50 text-emerald-700' },
            { title: 'Permit approved for Urban Condo expansion', time: 'Yesterday at 09:10 AM', category: 'Legal', color: 'bg-purple-50 text-purple-700' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-gray-100 transition-all">
                <Activity size={18} className="text-gray-400 group-hover:text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${item.color}`}>
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900">Project Progress</h3>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus size={18} />
          </button>
        </div>
        <div className="space-y-6">
          {[
            { name: 'Foundation & Excavation', progress: 85, color: 'bg-blue-600' },
            { name: 'Structural Framing', progress: 60, color: 'bg-purple-600' },
            { name: 'Interior Finishing', progress: 30, color: 'bg-emerald-600' },
            { name: 'Landscaping & Exterior', progress: 10, color: 'bg-orange-600' },
          ].map((proj, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-gray-700">{proj.name}</span>
                <span className="text-gray-500 font-medium">{proj.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${proj.progress}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className={`${proj.color} h-full rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-10 py-3 text-sm font-bold text-gray-600 border-2 border-dashed border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 group">
          <Building2 size={18} className="group-hover:scale-110 transition-transform" />
          Add New Site
        </button>
      </Card>
    </div>
  </div>
);

const UsersView = ({ type = 'Users' }: { type?: string }) => {
  const builders = MOCK_BUILDERS.filter(b => b.status === 'Approved');

  if (type === 'Builders') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Expert Builders</h3>
            <p className="text-sm text-gray-500 mt-1">Review performance and manage your construction partners</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100">
            <Plus size={18} />
            Add Builder
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {builders.map((builder, i) => (
            <Card key={i} className="hover:border-blue-200 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <ImageWithFallback src={builder.avatar} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt={builder.name} />
                <div className="flex flex-col items-end">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600`}>
                    {builder.status}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600 mt-2">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  {builder.name}
                  {builder.rating >= 4.8 && <CheckCircle2 size={16} className="text-blue-500" />}
                </h4>
                <p className="text-sm font-medium text-gray-500">{builder.specialty} Specialist</p>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "{builder.summary}"
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Projects</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{builder.projects} Completed</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Rating</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <p className="text-sm font-bold text-gray-900">{builder.rating}</p>
                    <span className="text-xs text-gray-400 font-medium">({builder.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  View Portfolio
                </button>
                <button className="flex-1 py-2 text-xs font-bold text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  Contact
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{type}</h3>
          <p className="text-sm text-gray-500 mt-1">Manage your {type.toLowerCase()} and their account details</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            Export CSV
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-100">
            <Plus size={18} />
            Add {type === 'Clients' ? 'Client' : 'Builder'}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="pb-4 pl-2">Name</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">{type === 'Clients' ? 'Project' : 'Specialty'}</th>
              <th className="pb-4">Email</th>
              <th className="pb-4 pr-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(type === 'Clients' ? [1, 2, 3, 4, 5] : builders).map((item, i) => (
              <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-5 pl-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${type === 'Clients' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'}`}>
                      {type === 'Clients' ? ['SC', 'TR', 'BW', 'MH', 'JD'][i] : (item as any).initials}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 block">
                        {type === 'Clients' 
                          ? ['Sarah Connor', 'Tony Rogers', 'Bruce Wayne', 'Matt Hammond', 'Jane Doe'][i]
                          : (item as any).name}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">Joined Oct 2023</span>
                    </div>
                  </div>
                </td>
                <td className="py-5">
                  <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${type === 'Clients' ? (i % 3 === 0 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600') : 'bg-emerald-50 text-emerald-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${type === 'Clients' ? (i % 3 === 0 ? 'bg-amber-600' : 'bg-emerald-600') : 'bg-emerald-600'}`}></span>
                    {type === 'Clients' ? (i % 3 === 0 ? 'Pending' : 'Active') : 'Approved'}
                  </span>
                </td>
                <td className="py-5 text-sm font-semibold text-gray-600">
                  {type === 'Clients' 
                    ? ['Modern Villa', 'Tech Office', 'Beach House', 'Urban Condo', 'Loft Setup'][i]
                    : (item as any).specialty}
                </td>
                <td className="py-5 text-sm text-gray-500 font-medium">
                  {type.toLowerCase().slice(0, -1)}@example.com
                </td>
                <td className="py-5 pr-2 text-right">
                  <button className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const ProjectsView = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Active Projects</h3>
        <p className="text-sm text-gray-500 mt-1">Track and manage your ongoing construction projects</p>
      </div>
      <div className="flex gap-3">
        <div className="flex border border-gray-200 rounded-lg p-1 bg-white">
          <button className="p-1.5 rounded-md bg-gray-50 text-blue-600 shadow-sm">
            <LayoutDashboard size={18} />
          </button>
          <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-600">
            <UsersIcon size={18} />
          </button>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100">
          <Plus size={18} />
          New Project
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'Modern Villa', client: 'Sarah Connor', progress: 75, status: 'In Progress', deadline: 'Dec 15, 2026', color: 'bg-blue-600' },
        { name: 'Tech Office', client: 'Tony Rogers', progress: 45, status: 'Review', deadline: 'Jan 20, 2027', color: 'bg-purple-600' },
        { name: 'Beach House', client: 'Bruce Wayne', progress: 90, status: 'Near Completion', deadline: 'Oct 30, 2026', color: 'bg-emerald-600' },
        { name: 'Urban Condo', client: 'Matt Hammond', progress: 20, status: 'Planning', deadline: 'Mar 12, 2027', color: 'bg-orange-600' },
        { name: 'Loft Setup', client: 'Jane Doe', progress: 100, status: 'Completed', deadline: 'Aug 05, 2026', color: 'bg-gray-400' },
      ].map((project, i) => (
        <Card key={i} className="hover:border-blue-200 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${project.status === 'Completed' ? 'bg-gray-400' : 'bg-blue-600 animate-pulse'}`}></span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{project.status}</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{project.name}</h4>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <UserCircle size={14} /> {project.client}
          </p>
          
          <div className="mt-6">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-500 font-medium">Progress</span>
              <span className="text-gray-900 font-bold">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className={`${project.color} h-full rounded-full`} style={{ width: `${project.progress}%` }}></div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(j => (
                <div key={j} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                  {['AJ', 'MS', 'KD'][j-1]}
                </div>
              ))}
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Deadline</p>
              <p className="text-xs font-bold text-gray-700">{project.deadline}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const SupportRequestsView = () => {
  const requests = [
    { id: 'SR-1024', client: 'Sarah Connor', subject: 'Foundation leak issue', priority: 'High', status: 'Open', date: '2 hours ago' },
    { id: 'SR-1025', client: 'Tony Rogers', subject: 'Material delivery delay', priority: 'Medium', status: 'In Progress', date: '5 hours ago' },
    { id: 'SR-1026', client: 'Bruce Wayne', subject: 'Permit application help', priority: 'Low', status: 'Resolved', date: 'Yesterday' },
    { id: 'SR-1027', client: 'Jane Doe', subject: 'Electrical plan revision', priority: 'High', status: 'Open', date: '1 day ago' },
  ];

  return (
    <Card>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Support Requests</h3>
          <p className="text-sm text-gray-500 mt-1">Manage and respond to client support tickets</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100">
          <Plus size={18} />
          New Ticket
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="pb-4 pl-2">Ticket ID</th>
              <th className="pb-4">Client</th>
              <th className="pb-4">Subject</th>
              <th className="pb-4">Priority</th>
              <th className="pb-4">Status</th>
              <th className="pb-4 pr-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {requests.map((req) => (
              <tr key={req.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-5 pl-2 font-bold text-sm text-blue-600">{req.id}</td>
                <td className="py-5 text-sm font-bold text-gray-900">{req.client}</td>
                <td className="py-5">
                  <p className="text-sm font-medium text-gray-700">{req.subject}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{req.date}</p>
                </td>
                <td className="py-5">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                    req.priority === 'High' ? 'bg-red-50 text-red-600' : 
                    req.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {req.priority}
                  </span>
                </td>
                <td className="py-5">
                   <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                     req.status === 'Open' ? 'bg-emerald-50 text-emerald-600' : 
                     req.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
                   }`}>
                    {req.status}
                  </span>
                </td>
                <td className="py-5 pr-2 text-right">
                  <button className="text-blue-600 font-bold text-xs hover:underline">Reply</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const EventsView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const events = [
    { id: 1, title: 'Foundation Inspection', project: 'Modern Villa', time: '09:00 AM', type: 'Inspection', color: 'bg-blue-100 text-blue-700' },
    { id: 2, title: 'Steel Beam Delivery', project: 'Urban Condo', time: '11:30 AM', type: 'Logistics', color: 'bg-orange-100 text-orange-700' },
    { id: 3, title: 'Client Site Walkthrough', project: 'Beach House', time: '02:00 PM', type: 'Meeting', color: 'bg-purple-100 text-purple-700' },
    { id: 4, title: 'Safety Audit', project: 'Modern Loft', time: '04:30 PM', type: 'Compliance', color: 'bg-emerald-100 text-emerald-700' },
  ];

  // Simple calendar generator for the current month
  const daysInMonth = 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Project Schedule</h3>
            <p className="text-sm text-gray-500 mt-1">October 2023</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"><ChevronDown size={18} className="rotate-90" /></button>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"><ChevronDown size={18} className="-rotate-90" /></button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-px bg-gray-100 border border-gray-100 rounded-xl overflow-hidden mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-50 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">{day}</div>
          ))}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-white h-24 p-2 opacity-30"></div>
          ))}
          {days.map(day => (
            <div key={day} className={`bg-white h-24 p-2 border-t border-l border-gray-50 hover:bg-blue-50/30 transition-colors cursor-pointer relative group ${day === 12 ? 'ring-2 ring-blue-500 ring-inset' : ''}`}>
              <span className={`text-xs font-bold ${day === 12 ? 'text-blue-600' : 'text-gray-500'}`}>{day}</span>
              {day === 12 && (
                <div className="mt-1 space-y-1">
                  <div className="h-1.5 w-full bg-blue-500 rounded-full"></div>
                  <div className="h-1.5 w-2/3 bg-orange-500 rounded-full"></div>
                </div>
              )}
              {day === 15 && <div className="mt-1 h-1.5 w-full bg-purple-500 rounded-full"></div>}
              {day === 22 && <div className="mt-1 h-1.5 w-full bg-emerald-500 rounded-full"></div>}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-6">Upcoming Events</h3>
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="flex gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Oct</span>
                <span className="text-sm font-bold text-gray-900">12</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{event.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{event.project} • {event.time}</p>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${event.color}`}>
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-10 py-3 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all flex items-center justify-center gap-2">
          <Plus size={18} />
          Schedule Event
        </button>
      </Card>
    </div>
  );
};

const VerificationsView = () => {
  const [currentFilter, setCurrentFilter] = useState('Pending');
  
  const buildersByStatus = {
    Pending: MOCK_BUILDERS.filter(b => b.status === 'Pending'),
    Approved: MOCK_BUILDERS.filter(b => b.status === 'Approved'),
    Rejected: MOCK_BUILDERS.filter(b => b.status === 'Rejected')
  };

  const currentList = buildersByStatus[currentFilter as keyof typeof buildersByStatus] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Builder Verifications</h3>
          <p className="text-sm text-gray-500 mt-1">Verify credentials and approve new builder accounts</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-gray-100 shadow-sm">
          {['Pending', 'Approved', 'Rejected'].map((filter) => (
            <button 
              key={filter}
              onClick={() => setCurrentFilter(filter)}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                currentFilter === filter 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {filter} ({buildersByStatus[filter as keyof typeof buildersByStatus].length})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentList.length > 0 ? (
          currentList.map((builder) => (
            <Card key={builder.id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-blue-200 transition-all">
              <div className="flex items-center gap-4">
                <ImageWithFallback src={builder.avatar} className="w-14 h-14 rounded-2xl object-cover" alt={builder.name} />
                <div>
                  <h4 className="font-bold text-gray-900">{builder.name}</h4>
                  <p className="text-sm text-gray-500">{builder.business}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck size={12} /> {builder.docs}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <CalendarIcon size={12} /> {builder.status === 'Pending' ? 'Applied' : builder.status} {builder.applied}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition-all">
                  Review Profile
                </button>
                {currentFilter === 'Pending' && (
                  <>
                    <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">
                      Approve
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-all">
                      Reject
                    </button>
                  </>
                )}
                {currentFilter === 'Approved' && (
                  <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-all">
                    View Credentials
                  </button>
                )}
                {currentFilter === 'Rejected' && (
                  <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-orange-50 text-orange-600 text-xs font-bold hover:bg-orange-100 transition-all">
                    View Reasons
                  </button>
                )}
              </div>
            </Card>
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-medium italic">No {currentFilter.toLowerCase()} builders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-64 space-y-1">
        {[
          { id: 'profile', label: 'My Profile', icon: UserCircle },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'security', label: 'Security', icon: Settings },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-white shadow-sm text-blue-600 ring-1 ring-gray-100 font-bold' 
                : 'text-gray-500 hover:bg-white/50'
            }`}
          >
            <item.icon size={18} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <Card className="flex-1">
        {activeTab === 'profile' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
              <p className="text-sm text-gray-500 mt-1">Update your photo and personal details.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-gray-50">
              <div className="relative group">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1701463387028-3947648f1337?w=300" 
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-gray-50"
                  alt="Avatar"
                />
                <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100 text-blue-600 hover:text-blue-700">
                  <Plus size={16} />
                </button>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">Alex Johnson</h4>
                <p className="text-sm text-gray-500">Administrator</p>
                <div className="flex gap-2 mt-2">
                  <button className="text-xs font-bold text-blue-600 hover:underline">Upload new photo</button>
                  <span className="text-gray-300">|</span>
                  <button className="text-xs font-bold text-red-500 hover:underline">Remove</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">First Name</label>
                <input type="text" defaultValue="Alex" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Last Name</label>
                <input type="text" defaultValue="Johnson" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700">Email Address</label>
                <input type="email" defaultValue="alex@layerdash.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
              <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
              <button className="px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">Save Changes</button>
            </div>
          </div>
        )}

        {activeTab !== 'profile' && (
          <div className="h-64 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 text-gray-300">
              <Settings size={32} />
            </div>
            <h3 className="font-bold text-gray-900 capitalize">{activeTab} Settings</h3>
            <p className="text-sm text-gray-500 mt-2">Configuration for {activeTab} will be available here.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

// --- Main Page Component ---

export default function DashboardPage({ 
  primaryColor = '#2563eb',
  avatarImage = { src: "https://images.unsplash.com/photo-1701463387028-3947648f1337?w=300", alt: "User Avatar" }
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'users-clients': return <UsersView type="Clients" />;
      case 'users-builders': return <UsersView type="Builders" />;
      case 'projects': return <ProjectsView />;
      case 'support': return <SupportRequestsView />;
      case 'verifications': return <VerificationsView />;
      case 'events': return <EventsView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans text-gray-900">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />
      
      <motion.main 
        animate={{ marginLeft: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 min-w-0"
      >
        <Header title={activeTab} avatarUrl={avatarImage.src} />
        
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}


