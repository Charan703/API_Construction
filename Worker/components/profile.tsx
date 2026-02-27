import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Briefcase,
  History,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export function ProfilePage() {
  const certifications = [
    { name: 'OSHA 30-Hour Construction', date: 'Jan 2024', status: 'Active' },
    { name: 'Site Safety Manager (SSM)', date: 'Mar 2023', status: 'Active' },
    { name: 'Heavy Equipment Operation', date: 'Nov 2022', status: 'Active' },
    { name: 'First Aid & CPR', date: 'Feb 2025', status: 'Active' },
  ];

  const recentActivity = [
    { project: 'Skyline Residences', action: 'Uploaded site logs', time: '2h ago' },
    { project: 'The Harbor Lofts', action: 'Completed inspection', time: 'Yesterday' },
    { project: 'System', action: 'Updated profile information', time: '3 days ago' },
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#f8fafc] p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Worker Profile</h1>
          <p className="text-slate-500 mt-1">Manage your professional identity and certifications.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Main Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg mx-auto">
                  MC
                </div>
                <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Mike Conners</h2>
              <p className="text-blue-600 font-semibold text-sm">Senior Site Foreman</p>
              
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>m.conners@buildpro.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>+1 (555) 0123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>Chicago, IL</span>
                </div>
              </div>
            </div>

            <div className="bg-[#051139] rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-blue-400" />
                Performance Score
              </h3>
              <div className="text-4xl font-black mb-2">9.8<span className="text-lg text-blue-300">/10</span></div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-blue-400 w-[98%]"></div>
              </div>
              <p className="text-xs text-blue-200/60 leading-relaxed">
                Top 2% of foremen this quarter. Excellence in safety compliance and timeline management.
              </p>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                Active Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="p-4 border border-slate-100 rounded-xl hover:border-blue-100 transition-colors bg-slate-50/30">
                    <p className="font-bold text-slate-800 text-sm">{cert.name}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Issued {cert.date}</span>
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-black uppercase">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Professional Summary
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Dedicated Site Foreman with over 12 years of experience in managing large-scale commercial and residential construction projects. Proven track record of leading diverse teams, ensuring strict adherence to safety protocols, and delivering projects within budget and on schedule. Expert in interpreting architectural blueprints and coordinating with multi-disciplinary stakeholders.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <History className="w-5 h-5 text-slate-500" />
                  Recent Activity
                </h3>
                <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                  Full History <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{act.action}</p>
                      <p className="text-xs text-slate-400 font-medium">{act.project}</p>
                    </div>
                    <span className="text-xs text-slate-400">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
