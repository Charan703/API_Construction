import React, { useState } from 'react';
import { 
  FileCheck, 
  ListChecks, 
  PhoneCall, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ShieldCheck,
  ClipboardList,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';

export function SupportServicesView() {
  const [activeTab, setActiveTab] = useState('verification');

  const services = [
    { 
      id: 'verification', 
      label: 'Document Verification', 
      icon: FileCheck,
      description: 'Expert review of construction permits, licenses, and safety certifications.'
    },
    { 
      id: 'checklist', 
      label: 'Registration Checklist', 
      icon: ListChecks,
      description: 'Step-by-step guide and preparation for site registration and legal verification.'
    },
    { 
      id: 'call', 
      label: 'Support Call Service', 
      icon: PhoneCall,
      description: 'Direct line to our construction legal and technical consultants.'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Support Services</h2>
          <p className="text-slate-500">Specialized assistance for construction documentation and compliance.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
          <ShieldCheck className="w-4 h-4" />
          Certified Consultant Available
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setActiveTab(service.id)}
            className={`p-6 rounded-2xl border transition-all text-left group ${
              activeTab === service.id 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
              activeTab === service.id ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-blue-50'
            }`}>
              <service.icon className={`w-6 h-6 ${activeTab === service.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'}`} />
            </div>
            <h3 className={`font-bold mb-2 ${activeTab === service.id ? 'text-white' : 'text-slate-900'}`}>
              {service.label}
            </h3>
            <p className={`text-xs leading-relaxed ${activeTab === service.id ? 'text-blue-100' : 'text-slate-500'}`}>
              {service.description}
            </p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
        {activeTab === 'verification' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900">Active Verification Requests</h3>
              <button className="text-sm font-bold text-blue-600 hover:underline">New Request +</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Environmental Impact Assessment', status: 'In Review', date: 'Feb 10, 2026', type: 'Permit' },
                { name: 'Site Safety Audit Plan', status: 'Verified', date: 'Feb 08, 2026', type: 'Safety' },
                { name: 'Structural Engineering Certs', status: 'Pending', date: 'Feb 11, 2026', type: 'Engineering' },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.type} • Requested on {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-700' :
                      doc.status === 'In Review' ? 'bg-blue-50 text-blue-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {doc.status}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-slate-600">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Registration Checklist</h3>
                <p className="text-sm text-slate-500">Project: Skyview Residences Phase II</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">65% Complete</p>
                <div className="w-32 h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-blue-600 w-[65%]" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                { title: 'Land Ownership Verification', status: 'completed' },
                { title: 'Architectural Site Plan Approval', status: 'completed' },
                { title: 'Structural Stability Certificate', status: 'pending' },
                { title: 'Fire Safety NOC', status: 'in-progress' },
                { title: 'Environmental Clearance (SEIAA)', status: 'pending' },
                { title: 'Plumbing & Sanitation NOC', status: 'completed' },
                { title: 'Elevator Safety Certificate', status: 'not-started' },
                { title: 'Completion Certificate Request', status: 'not-started' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 rounded-full p-0.5 ${
                    item.status === 'completed' ? 'text-emerald-500' : 
                    item.status === 'in-progress' ? 'text-blue-500 animate-pulse' : 
                    'text-slate-300'
                  }`}>
                    {item.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${item.status === 'completed' ? 'text-slate-900' : 'text-slate-600'}`}>
                      {item.title}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
                      {item.status.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'call' && (
          <div className="p-8 flex flex-col items-center justify-center text-center h-full min-h-[350px]">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <PhoneCall className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Speak with a Consultant</h3>
            <p className="text-slate-500 max-w-md mb-8">
              Our support team is available Mon-Fri, 9AM-6PM. For urgent site registration issues, priority support is available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                <PhoneCall className="w-4 h-4" />
                Start Call Now
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all">
                <MessageSquare className="w-4 h-4" />
                Schedule Consultation
              </button>
            </div>
            <p className="mt-8 text-xs text-slate-400">
              Average wait time: <span className="text-emerald-600 font-bold">&lt; 2 minutes</span>
            </p>
          </div>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-amber-900">New Compliance Regulation Notice</h4>
          <p className="text-sm text-amber-700 mt-1">
            As of Feb 1st, 2026, all site registration documents must include a digital environmental stamp. Our Verification service has been updated to include this check automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
