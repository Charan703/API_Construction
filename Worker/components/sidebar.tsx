import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  CheckSquare, 
  HardHat, 
  User, 
  Settings, 
  LogOut,
  Hammer
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const mainItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Daily Tasks', icon: CheckSquare },
    { id: 'projects', label: 'Active Sites', icon: Hammer },
  ];

  const bottomItems = [
    { id: 'profile', label: 'Worker Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ width: isHovered ? 256 : 88 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-full bg-[#051139] text-white flex flex-col shadow-2xl border-r border-white/5 overflow-hidden z-50 relative"
    >
      <div className="p-6">
        <div className="flex items-center h-10 gap-3 mb-8 overflow-hidden">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex-shrink-0 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <HardHat className="text-white w-6 h-6" />
          </div>
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-xl font-bold tracking-tight whitespace-nowrap overflow-hidden"
              >
                BuildPro API
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className={`flex items-center h-16 gap-3 p-3 transition-all duration-300 ${isHovered ? 'bg-white/5 rounded-xl border border-white/10 mb-6' : 'bg-transparent border-transparent mb-4'} overflow-hidden`}>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white font-bold shadow-md">
            MC
          </div>
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="min-w-0 overflow-hidden"
              >
                <p className="text-sm font-bold text-white truncate whitespace-nowrap">Mike Conners</p>
                <p className="text-xs text-blue-200/60 truncate whitespace-nowrap">Site Foreman</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {mainItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className={`w-6 h-6 flex-shrink-0 transition-colors ${activeTab === item.id ? 'text-white' : 'text-blue-200/40 group-hover:text-white'}`} />
            
            <AnimatePresence mode="wait">
              {isHovered && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {!isHovered && (
              <div className="absolute left-16 px-2 py-1 bg-[#051139] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/10 z-[60]">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-1 border-t border-white/5">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className={`w-6 h-6 flex-shrink-0 transition-colors ${activeTab === item.id ? 'text-white' : 'text-blue-200/40 group-hover:text-white'}`} />
            
            <AnimatePresence mode="wait">
              {isHovered && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {!isHovered && (
              <div className="absolute left-16 px-2 py-1 bg-[#051139] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/10 z-[60]">
                {item.label}
              </div>
            )}
          </button>
        ))}

        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-blue-100/60 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group relative mt-4">
          <LogOut className="w-6 h-6 flex-shrink-0" />
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
          {!isHovered && (
            <div className="absolute left-16 px-2 py-1 bg-[#051139] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/10 z-[60]">
              Logout
            </div>
          )}
        </button>
      </div>
    </motion.div>
  );
}
