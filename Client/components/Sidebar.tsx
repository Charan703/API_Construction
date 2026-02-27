import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Files, 
  Settings, 
  User, 
  HardHat, 
  ClipboardList, 
  Truck, 
  Users,
  LogOut,
  LifeBuoy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'documents', label: 'Documents', icon: Files },
    { id: 'reports', label: 'Site Reports', icon: ClipboardList },
    { id: 'safety', label: 'Safety Logs', icon: HardHat },
    { id: 'resources', label: 'Resource Allocation', icon: Truck },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'support', label: 'Support Services', icon: LifeBuoy },
  ];

  const bottomItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.div 
      initial={false}
      animate={{ width: isHovered ? 256 : 80 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col h-full bg-slate-900 text-slate-300 p-4 border-r border-slate-800 z-50 shadow-xl overflow-hidden"
    >
      <div className={`flex items-center gap-3 px-2 mb-10 min-h-[40px] ${!isHovered ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
          <HardHat className="text-white w-6 h-6" />
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap"
            >
              <h1 className="text-white font-semibold tracking-tight">Structura</h1>
              <p className="text-xs text-slate-500">Construction CMS</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-colors group relative ${
              !isHovered ? 'justify-center' : ''
            } ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
            
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {activeTab === item.id && !isHovered && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-l-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-slate-800 space-y-2">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-colors group relative ${
              !isHovered ? 'justify-center' : ''
            } ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
        <button className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-red-900/10 hover:text-red-400 transition-colors mt-2 ${!isHovered ? 'justify-center' : ''}`}>
          <LogOut className="w-5 h-5 shrink-0" />
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                Log out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}
