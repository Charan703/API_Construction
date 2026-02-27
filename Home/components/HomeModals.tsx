import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { api } from '../../src/api';
import { AddProjectModal, AddBuilderModal } from '../../src/Modals';

export function HomeButtons() {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [builders, setBuilders] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    api.getProjects().then(setProjects);
    api.getBuilders().then(setBuilders);
  };

  return {
    showProjectModal,
    setShowProjectModal,
    showBuilderModal,
    setShowBuilderModal,
    loadData,
    projects,
    builders
  };
}

export function AddClientModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_id: '1'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.createClient(formData).then(() => {
      onSuccess();
      onClose();
      alert('Client added successfully!');
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Add Client</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg" required
            onChange={e => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" required
            onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="tel" placeholder="Phone" className="w-full px-4 py-2 border rounded-lg" required
            onChange={e => setFormData({...formData, phone: e.target.value})} />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add Client</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddSupportModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    client_name: '',
    subject: '',
    priority: 'Medium',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.createSupportRequest(formData).then(() => {
      onSuccess();
      onClose();
      alert('Support ticket created!');
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">New Support Ticket</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Client Name" className="w-full px-4 py-2 border rounded-lg" required
            onChange={e => setFormData({...formData, client_name: e.target.value})} />
          <input placeholder="Subject" className="w-full px-4 py-2 border rounded-lg" required
            onChange={e => setFormData({...formData, subject: e.target.value})} />
          <select className="w-full px-4 py-2 border rounded-lg" onChange={e => setFormData({...formData, priority: e.target.value})}>
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <textarea placeholder="Description" className="w-full px-4 py-2 border rounded-lg" rows={3} required
            onChange={e => setFormData({...formData, description: e.target.value})} />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Create Ticket</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddEventModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    project_id: '1',
    event_type: 'Meeting',
    event_date: new Date().toISOString().split('T')[0],
    event_time: '09:00'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.createEvent(formData).then(() => {
      onSuccess();
      onClose();
      alert('Event scheduled!');
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Schedule Event</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Event Title" className="w-full px-4 py-2 border rounded-lg" required
            onChange={e => setFormData({...formData, title: e.target.value})} />
          <select className="w-full px-4 py-2 border rounded-lg" onChange={e => setFormData({...formData, event_type: e.target.value})}>
            <option>Meeting</option><option>Inspection</option><option>Logistics</option><option>Compliance</option>
          </select>
          <input type="date" className="w-full px-4 py-2 border rounded-lg" required value={formData.event_date}
            onChange={e => setFormData({...formData, event_date: e.target.value})} />
          <input type="time" className="w-full px-4 py-2 border rounded-lg" required value={formData.event_time}
            onChange={e => setFormData({...formData, event_time: e.target.value})} />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Schedule</button>
          </div>
        </form>
      </div>
    </div>
  );
}
