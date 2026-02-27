import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Bell, 
  Lock, 
  Eye, 
  Smartphone, 
  Globe, 
  Database, 
  HelpCircle,
  Save,
  Shield,
  Key
} from 'lucide-react';

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 overflow-auto bg-[#f8fafc] p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Application Settings</h1>
            <p className="text-slate-500 mt-1">Configure your BuildPro API experience and safety alerts.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
            <Save className="w-5 h-5" />
            <span className="font-semibold">Save Changes</span>
          </button>
        </header>

        <div className="space-y-6">
          {/* Notifications */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Notifications & Alerts
            </h3>
            <div className="space-y-6">
              {[
                { key: 'push', label: 'Push Notifications', desc: 'Real-time alerts for safety warnings and site updates.' },
                { key: 'email', label: 'Email Reports', desc: 'Weekly summary of site progress and inspection results.' },
                { key: 'sms', label: 'SMS Alerts', desc: 'Emergency site alerts sent directly to your phone.' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-slate-200'}`}
                  >
                    <motion.div 
                      animate={{ x: notifications[item.key as keyof typeof notifications] ? 26 : 2 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Security */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Security
              </h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <Key className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    <span className="text-sm font-bold text-slate-700">Change Password</span>
                  </div>
                  <Lock className="w-4 h-4 text-slate-300" />
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    <span className="text-sm font-bold text-slate-700">Two-Factor Auth</span>
                  </div>
                  <div className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">Enabled</div>
                </button>
              </div>
            </section>

            {/* AI Engine Settings */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                AI Analysis Engine
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Analysis Sensitivity</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option>Standard (Recommended)</option>
                    <option>High (Detailed inspections)</option>
                    <option>Safety Focus (Hazard detection)</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>AI will automatically tag structural elements in site photos.</span>
                </div>
              </div>
            </section>
          </div>

          {/* System */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-slate-400" />
              System & Preferences
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-bold text-slate-700 text-sm">Language</p>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-slate-700 text-sm">Measurement Unit</p>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600">
                  <option>Imperial (ft, in)</option>
                  <option>Metric (m, cm)</option>
                </select>
              </div>
            </div>
          </section>

          <div className="pt-4 flex justify-between items-center text-slate-400">
            <div className="flex items-center gap-2 text-xs font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>Version 2.4.0 (Build 5621)</span>
            </div>
            <button className="text-xs font-bold hover:text-red-500 transition-colors uppercase tracking-widest">
              Delete Account Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
