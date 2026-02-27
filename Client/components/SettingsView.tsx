import React, { useState } from 'react';
import { 
  Bell, 
  Shield, 
  User, 
  Globe, 
  Database, 
  Smartphone,
  Check,
  Save,
  Building2,
  Lock,
  Mail,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

export function SettingsView() {
  const [activeSection, setActiveSection] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const sections = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Zap },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
          <p className="text-slate-500">Manage your workspace and account preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === section.id
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {activeSection === 'general' && (
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">Workspace Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Project Name</label>
                      <input 
                        type="text" 
                        defaultValue="Skyview Residences" 
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Organization</label>
                      <input 
                        type="text" 
                        defaultValue="Metropolitan Developers Ltd." 
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Project Timezone</label>
                      <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50">
                        <option>(GMT-05:00) Eastern Time</option>
                        <option>(GMT-08:00) Pacific Time</option>
                        <option>(GMT+00:00) London</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Measurement Units</label>
                      <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50">
                        <option>Metric (meters, kg)</option>
                        <option>Imperial (feet, lbs)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Branding</h3>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300">
                      <Building2 className="w-8 h-8 text-slate-400" />
                    </div>
                    <div className="space-y-1">
                      <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Upload new logo</button>
                      <p className="text-xs text-slate-500">JPG, PNG or SVG. Max size 2MB.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="p-6 md:p-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Notification Preferences</h3>
                <div className="space-y-6">
                  {[
                    { title: 'Safety Incidents', desc: 'Alerts when a new safety log or incident is reported.', icon: Shield },
                    { title: 'Project Updates', desc: 'Daily summary of project progress and site reports.', icon: Globe },
                    { title: 'Document Approvals', desc: 'Notifications when documents are pending your review.', icon: Zap },
                    { title: 'Team Messages', desc: 'Direct messages and project discussions.', icon: Mail },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">Password & Authentication</h3>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Two-factor Authentication</h4>
                      <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="text-sm font-semibold text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">Enable 2FA</button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'integrations' && (
              <div className="p-6 md:p-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Construction Tool Integrations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Procore', status: 'Connected', icon: 'P' },
                    { name: 'Autodesk Build', status: 'Disconnected', icon: 'A' },
                    { name: 'Slack', status: 'Connected', icon: 'S' },
                    { name: 'Google Drive', status: 'Connected', icon: 'G' },
                  ].map((app, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-slate-400 border border-slate-100 shadow-sm">
                          {app.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{app.name}</p>
                          <p className="text-xs text-slate-500">{app.status}</p>
                        </div>
                      </div>
                      <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                        app.status === 'Connected' ? 'text-red-600 bg-red-50 hover:bg-red-100' : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                      }`}>
                        {app.status === 'Connected' ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
            <h3 className="text-sm font-bold text-red-900 uppercase tracking-wider mb-2">Danger Zone</h3>
            <p className="text-sm text-red-600 mb-4">Once you delete a project, there is no going back. Please be certain.</p>
            <button className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors">
              Archive Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
