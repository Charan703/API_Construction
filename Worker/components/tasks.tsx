import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  Clock, 
  MoreVertical, 
  Filter,
  Search,
  CheckCircle2,
  Hammer,
  ArrowRight
} from 'lucide-react';

import { api } from '../../src/api';
import { AddTaskModal } from '../../src/Modals';

interface Task {
  id: string;
  title: string;
  project: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed';
  dueDate: string;
}

const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Safety Perimeter Inspection', project: 'Skyline Residences', priority: 'High', status: 'Pending', dueDate: '09:00 AM' },
  { id: 't2', title: 'Verify Concrete Slump Test Results', project: 'Green Valley Office Hub', priority: 'High', status: 'Completed', dueDate: '10:30 AM' },
  { id: 't3', title: 'Log Structural Steel Delivery', project: 'Skyline Residences', priority: 'Medium', status: 'Pending', dueDate: '11:00 AM' },
  { id: 't4', title: 'Coordinate Framing Subcontractors', project: 'The Harbor Lofts', priority: 'Medium', status: 'Pending', dueDate: '01:30 PM' },
  { id: 't5', title: 'Review Finishing Material Inventory', project: 'The Harbor Lofts', priority: 'Low', status: 'Completed', dueDate: '03:00 PM' },
  { id: 't6', title: 'Daily Site Clean-up Supervision', project: 'Skyline Residences', priority: 'Low', status: 'Pending', dueDate: '04:30 PM' },
];

export function DailyTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    api.getTasks().then(setTasks).catch(() => setTasks(INITIAL_TASKS));
  };

  const toggleTask = (id: string) => {
    api.toggleTask(id).then(() => {
      setTasks(prev => prev.map(t => 
        t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t
      ));
    });
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="flex-1 overflow-auto bg-[#f8fafc] p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <CheckSquare className="w-8 h-8 text-blue-600" />
              Daily Tasks
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Manage and log your critical site activities for Thursday, Feb 12.</p>
          </div>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60 min-w-[240px]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Daily Progress</span>
              <span className="text-sm font-black text-blue-600">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
              <motion.div 
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-blue-600"
              />
            </div>
          </div>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
          {/* Controls */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center bg-slate-50/30">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tasks or sites..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button onClick={() => setShowAddModal(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/10">
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="divide-y divide-slate-100">
            {filteredTasks.map((task) => (
              <motion.div 
                layout
                key={task.id}
                className={`p-5 flex items-center gap-4 hover:bg-slate-50/80 transition-colors group ${task.status === 'Completed' ? 'opacity-60' : ''}`}
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 transition-all duration-200 ${task.status === 'Completed' ? 'text-green-500' : 'text-slate-300 hover:text-blue-500'}`}
                >
                  {task.status === 'Completed' ? <CheckCircle2 className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className={`font-bold text-slate-800 truncate ${task.status === 'Completed' ? 'line-through' : ''}`}>
                      {task.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                      task.priority === 'High' ? 'bg-red-50 text-red-600' :
                      task.priority === 'Medium' ? 'bg-blue-50 text-blue-600' :
                      'bg-slate-50 text-slate-500'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Hammer className="w-3 h-3 text-slate-400" />
                      {task.project}
                    </span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      Due {task.dueDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-200" />
                </div>
                <h3 className="font-bold text-slate-900">No tasks found</h3>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
            <button className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline">
              View Completed Archives
            </button>
          </div>
        </div>
      </div>
      {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} onSuccess={loadTasks} />}
    </div>
  );
}

function Plus(props: any) {
  return <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>;
}
