import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  Calendar, 
  Settings,
  LogOut,
  ChevronRight,
  ChevronDown,
  UserCircle,
  HardHat,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const mainMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { 
    id: 'users', 
    label: 'Users', 
    icon: Users,
    children: [
      { id: 'users-clients', label: 'Clients', icon: UserCircle },
      { id: 'users-builders', label: 'Builders', icon: HardHat },
    ]
  },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'support', label: 'Support', icon: MessageSquare },
  { id: 'verifications', label: 'Verifications', icon: ShieldCheck },
  { id: 'events', label: 'Events', icon: Calendar },
];

const bottomMenuItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>(['users']);

  const toggleExpand = (id: string) => {
    if (isCollapsed) return;
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderMenuItem = (item: any) => {
    const Icon = item.icon;
    const isExpanded = expandedMenus.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = !hasChildren && activeTab === item.id;
    const isParentOfActive = hasChildren && item.children.some(child => activeTab === child.id);
    
    return (
      <div key={item.id} className="space-y-1">
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            } else {
              setActiveTab(item.id);
            }
          }}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
            isActive || (isParentOfActive && isCollapsed)
              ? 'bg-blue-600 text-white' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <Icon size={20} className={(isActive || (isParentOfActive && isCollapsed)) ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold text-[14px] whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          {!isCollapsed && (
            <div className="flex items-center gap-1">
              {hasChildren && (
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={14} className="text-slate-500" />
                </motion.div>
              )}
            </div>
          )}
        </button>

        <AnimatePresence>
          {hasChildren && isExpanded && !isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="ml-6 space-y-1 mt-1 border-l border-slate-800 pl-4">
                {item.children.map((child: any) => {
                  const ChildIcon = child.icon;
                  const isChildActive = activeTab === child.id;
                  return (
                    <button
                      key={child.id}
                      onClick={() => setActiveTab(child.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative ${
                        isChildActive 
                          ? 'text-white bg-slate-800 font-bold' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <ChildIcon size={16} className={isChildActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'} />
                      <span className="text-[13px] whitespace-nowrap">{child.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      className="h-screen bg-[#0f172a] border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
            <span className="text-white font-black text-lg">L</span>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-white tracking-tight text-lg whitespace-nowrap"
              >
                Layer Dash
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto mt-2">
        {mainMenuItems.map(renderMenuItem)}
      </nav>

      <div className="px-4 py-4 space-y-1.5 border-t border-slate-800">
        {bottomMenuItems.map(renderMenuItem)}
        <button className="w-full flex items-center gap-3 px-3 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200 group mt-2">
          <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-sm tracking-wide whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
