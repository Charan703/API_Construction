import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  Phone, 
  ExternalLink,
  Shield,
  Clock,
  Briefcase
} from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Marcus Chen',
    role: 'Project Architect',
    email: 'marcus.c@structura.com',
    phone: '+1 (555) 012-3456',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    department: 'Design'
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Site Manager',
    email: 'sarah.j@structura.com',
    phone: '+1 (555) 012-7890',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    department: 'Operations'
  },
  {
    id: 3,
    name: 'Robert Wilson',
    role: 'Safety Officer',
    email: 'robert.w@structura.com',
    phone: '+1 (555) 012-4567',
    status: 'In Field',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    department: 'Compliance'
  },
  {
    id: 4,
    name: 'Elena Rodriguez',
    role: 'Structural Engineer',
    email: 'elena.r@structura.com',
    phone: '+1 (555) 012-9012',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    department: 'Engineering'
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'Foreman',
    email: 'david.k@structura.com',
    phone: '+1 (555) 012-3344',
    status: 'Off-site',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    department: 'Labor'
  }
];

export function TeamView() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Team Members</h2>
          <p className="text-slate-500">Manage site personnel and project collaborators.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm">
          <UserPlus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Personnel</p>
            <p className="text-xl font-bold text-slate-900">42</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">On-site Today</p>
            <p className="text-xl font-bold text-slate-900">28</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Upcoming Shifts</p>
            <p className="text-xl font-bold text-slate-900">14</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search team..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white outline-none">
              <option>All Departments</option>
              <option>Design</option>
              <option>Engineering</option>
              <option>Operations</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Member</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role & Dept</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-500">ID: #ST-00{member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">{member.role}</span>
                      <span className="text-xs text-slate-400">{member.department}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                      member.status === 'In Field' ? 'bg-blue-50 text-blue-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
