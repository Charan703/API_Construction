import React, { useState, useEffect } from 'react';
import { 
  Scan, 
  Cpu, 
  CheckCircle2, 
  Brain, 
  ImageIcon, 
  TrendingUp,
  Activity,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const dailyLogs = [
  { id: 1, time: '08:30 AM', task: 'Concrete Slab Pouring', image: 'https://images.unsplash.com/photo-1541913055-94490e501107?w=100&h=100&fit=crop' },
  { id: 2, time: '11:45 AM', task: 'Steel Rebar Installation', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop' },
  { id: 3, time: '02:15 PM', task: 'Column Formwork', image: 'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?w=100&h=100&fit=crop' },
];

export function AIProgressTracker() {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(78.4);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Analyzing latest site uploads...",
    "Detecting structural components...",
    "Comparing vs CAD blueprints...",
    "Quantifying volumetric progress...",
    "Updating project timeline..."
  ];

  const triggerAnalysis = () => {
    setAnalyzing(true);
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length - 1) {
        step++;
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setAnalyzing(false);
        setProgress(prev => Math.min(prev + 0.2, 100));
        setCurrentStep(0);
      }
    }, 1200);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Brain className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              AI Vision Progress Analysis
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase rounded-md tracking-wider">Beta</span>
            </h4>
            <p className="text-xs text-slate-500">Autonomous progress tracking via daily site imagery</p>
          </div>
        </div>
        <button 
          onClick={triggerAnalysis}
          disabled={analyzing}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
            analyzing 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-indigo-100'
          }`}
        >
          {analyzing ? <Activity className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {analyzing ? 'Processing...' : 'Sync Site Progress'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="relative">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-slate-700">Calculated Completion</span>
              <span className="text-3xl font-black text-indigo-600">{progress.toFixed(1)}%</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 50 }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 relative"
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[move-stripe_1s_linear_infinite]" />
              </motion.div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Phase 2: Superstructure</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Goal: 85% by March</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              <Cpu className="w-3.5 h-3.5" />
              Live Analysis Feed
            </div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={analyzing ? steps[currentStep] : 'idle'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-3 text-sm"
              >
                {analyzing ? (
                  <>
                    <Scan className="w-4 h-4 text-indigo-500 animate-pulse" />
                    <span className="text-slate-700 font-medium italic">{steps[currentStep]}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-700 font-medium">All systems synced. Last scan 42m ago.</span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-slate-400" />
              Daily Builder Uploads
            </h5>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Today</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {dailyLogs.map((log) => (
              <div key={log.id} className="relative group">
                <img 
                  src={log.image} 
                  alt={log.task} 
                  className="w-full h-20 object-cover rounded-xl ring-1 ring-slate-200 group-hover:ring-indigo-300 transition-all cursor-pointer"
                />
                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 rounded-xl transition-all flex items-center justify-center">
                  <Scan className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <p className="text-[9px] font-bold text-slate-500 mt-1.5 truncate">{log.task}</p>
                <p className="text-[8px] text-slate-400">{log.time}</p>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-indigo-900 font-semibold italic">"Foundations confirmed 100% complete"</span>
              </div>
              <span className="text-[10px] text-indigo-500 font-bold tracking-tight">AI INSIGHT</span>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes move-stripe {
          from { background-position: 1rem 0; }
          to { background-position: 0 0; }
        }
      `}} />
    </div>
  );
}
