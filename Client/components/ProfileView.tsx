import React, { useState } from 'react';
import { PageHeader } from './PageHeader';
import { User, Mail, Phone, MapPin, Shield, Bell, Key } from 'lucide-react';

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

export function ProfileView() {
  return (
    <div className="max-w-4xl space-y-8">
      <PageHeader 
        title="Account Settings" 
        description="Manage your personal information and preferences"
      />

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 flex items-start gap-8 border-b border-slate-50">
          <div className="relative group">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1746899603348-ab9afd71e16d?w=200&q=80" 
              alt="Profile"
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-50"
            />
            <button className="absolute -bottom-2 -right-2 p-1.5 bg-blue-600 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <User className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900">Marcus Chen</h3>
            <p className="text-slate-500 text-sm">Senior Project Architect • Structura Build Group</p>
            <div className="mt-4 flex flex-wrap gap-4">
               <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                marcus.chen@structura.com
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                +1 (555) 234-5678
              </div>
            </div>
          </div>
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            Edit Profile
          </button>
        </div>

        <div className="p-8 space-y-8">
          <section>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Notification Preferences</h4>
            <div className="space-y-4">
              {[
                { title: 'Project Updates', desc: 'Get notified when milestones are reached', active: true },
                { title: 'Safety Alerts', desc: 'Critical alerts for site safety incidents', active: true },
                { title: 'Team Messages', desc: 'Direct messages and team mentions', active: false },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <div className={`w-10 h-5 rounded-full p-1 transition-colors cursor-pointer ${item.active ? 'bg-blue-600' : 'bg-slate-200'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full transition-transform ${item.active ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Security</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center gap-3 p-4 border border-slate-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/30 transition-all text-left group">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-600">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Change Password</p>
                  <p className="text-xs text-slate-500">Update your security credentials</p>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 border border-slate-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/30 transition-all text-left group">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-600">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Two-Factor Auth</p>
                  <p className="text-xs text-slate-500">Add an extra layer of security</p>
                </div>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
