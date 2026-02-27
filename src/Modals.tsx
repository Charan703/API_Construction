import React, { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../src/api';

export function AddProjectModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    status: 'Planning',
    health: 'On Track',
    due_date: '',
    supervisor: '',
    crew_size: 0,
    client_name: '',
    budget: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.createProject(formData).then(() => {
      onSuccess();
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">New Project</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Project Name" className="px-4 py-2 border rounded-lg" required
              onChange={e => setFormData({...formData, name: e.target.value})} />
            <input placeholder="Location" className="px-4 py-2 border rounded-lg" required
              onChange={e => setFormData({...formData, location: e.target.value})} />
            <select className="px-4 py-2 border rounded-lg" onChange={e => setFormData({...formData, status: e.target.value})}>
              <option>Planning</option><option>Foundation</option><option>Framing</option><option>Finishing</option>
            </select>
            <input type="date" className="px-4 py-2 border rounded-lg" required
              onChange={e => setFormData({...formData, due_date: e.target.value})} />
            <input placeholder="Supervisor" className="px-4 py-2 border rounded-lg" required
              onChange={e => setFormData({...formData, supervisor: e.target.value})} />
            <input type="number" placeholder="Crew Size" className="px-4 py-2 border rounded-lg" required
              onChange={e => setFormData({...formData, crew_size: parseInt(e.target.value)})} />
            <input placeholder="Client Name" className="px-4 py-2 border rounded-lg" required
              onChange={e => setFormData({...formData, client_name: e.target.value})} />
            <input type="number" placeholder="Budget" className="px-4 py-2 border rounded-lg" required
              onChange={e => setFormData({...formData, budget: parseFloat(e.target.value)})} />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddTaskModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    project_id: '1',
    priority: 'Medium',
    due_date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.createTask(formData).then(() => {
      onSuccess();
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">New Task</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Task Title" className="w-full px-4 py-2 border rounded-lg" required
            onChange={e => setFormData({...formData, title: e.target.value})} />
          <select className="w-full px-4 py-2 border rounded-lg" onChange={e => setFormData({...formData, priority: e.target.value})}>
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <input type="date" className="w-full px-4 py-2 border rounded-lg" required value={formData.due_date}
            onChange={e => setFormData({...formData, due_date: e.target.value})} />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddBuilderModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    specialty: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.createBuilder(formData).then(() => {
      onSuccess();
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Add Builder</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg" required
            onChange={e => setFormData({...formData, name: e.target.value})} />
          <input placeholder="Business Name" className="w-full px-4 py-2 border rounded-lg" required
            onChange={e => setFormData({...formData, business: e.target.value})} />
          <input placeholder="Specialty" className="w-full px-4 py-2 border rounded-lg" required
            onChange={e => setFormData({...formData, specialty: e.target.value})} />
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" required
            onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="tel" placeholder="Phone" className="w-full px-4 py-2 border rounded-lg" required
            onChange={e => setFormData({...formData, phone: e.target.value})} />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add Builder</button>
          </div>
        </form>
      </div>
    </div>
  );
}
