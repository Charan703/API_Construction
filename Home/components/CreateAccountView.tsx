import React, { useState } from 'react';
import { UserPlus, Shield, Eye, Edit, Trash2, FileText, Users, FolderOpen, Calendar, MessageSquare, ShieldCheck } from 'lucide-react';

type PrivilegeAction = 'view' | 'edit' | 'delete';
type PrivilegeModule = 'dashboard' | 'users' | 'projects' | 'support' | 'verifications' | 'events' | 'documents';
type PrivilegeState = Record<PrivilegeModule, Record<PrivilegeAction, boolean>>;

const initialPrivileges: PrivilegeState = {
  dashboard: { view: true, edit: false, delete: false },
  documents: { view: true, edit: false, delete: false },
  events: { view: true, edit: false, delete: false },
  projects: { view: true, edit: false, delete: false },
  support: { view: true, edit: false, delete: false },
  users: { view: true, edit: false, delete: false },
  verifications: { view: true, edit: false, delete: false },
};

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm ${className}`}>
    {children}
  </div>
);

export const CreateAccountView = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin'
  });

  const [privileges, setPrivileges] = useState<PrivilegeState>(initialPrivileges);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const privilegeModules: Array<{ id: PrivilegeModule; label: string; icon: typeof Shield }> = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'users', label: 'Users Management', icon: Users },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'support', label: 'Support Requests', icon: MessageSquare },
    { id: 'verifications', label: 'Verifications', icon: ShieldCheck },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  const handlePrivilegeChange = (module: PrivilegeModule, type: PrivilegeAction, value: boolean) => {
    setPrivileges(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [type]: value
      }
    }));
  };

  const selectAllPrivileges = () => {
    const allEnabled = (Object.keys(privileges) as PrivilegeModule[]).reduce<PrivilegeState>((acc, key) => ({
      ...acc,
      [key]: { view: true, edit: true, delete: true }
    }), { ...initialPrivileges });
    setPrivileges(allEnabled);
  };

  const clearAllPrivileges = () => {
    const allDisabled = (Object.keys(privileges) as PrivilegeModule[]).reduce<PrivilegeState>((acc, key) => ({
      ...acc,
      [key]: { view: false, edit: false, delete: false }
    }), { ...initialPrivileges });
    setPrivileges(allDisabled);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Here you would call your API to create the admin account
    console.log('Creating admin account:', { ...formData, privileges });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'admin'
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Create Admin Account</h3>
          <p className="text-sm text-gray-500 mt-1">Add a new administrator with custom privileges</p>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          <p className="text-sm font-medium">Admin account created successfully!</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Account Details</h4>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
              >
                <option value="admin">Administrator</option>
                <option value="super-admin">Super Administrator</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
          </form>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Access Privileges</h4>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={selectAllPrivileges}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={clearAllPrivileges}
                className="text-xs font-bold text-gray-600 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            <div className="grid grid-cols-4 gap-2 pb-3 border-b border-gray-100 sticky top-0 bg-white">
              <div className="col-span-1"></div>
              <div className="text-center">
                <Eye className="w-4 h-4 text-gray-400 mx-auto" />
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">View</p>
              </div>
              <div className="text-center">
                <Edit className="w-4 h-4 text-gray-400 mx-auto" />
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Edit</p>
              </div>
              <div className="text-center">
                <Trash2 className="w-4 h-4 text-gray-400 mx-auto" />
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Delete</p>
              </div>
            </div>

            {privilegeModules.map((module) => (
              <div key={module.id} className="grid grid-cols-4 gap-2 items-center py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors">
                <div className="flex items-center gap-2">
                  <module.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{module.label}</span>
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    checked={privileges[module.id]?.view || false}
                    onChange={(e) => handlePrivilegeChange(module.id, 'view', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    checked={privileges[module.id]?.edit || false}
                    onChange={(e) => handlePrivilegeChange(module.id, 'edit', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    checked={privileges[module.id]?.delete || false}
                    onChange={(e) => handlePrivilegeChange(module.id, 'delete', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Create Admin Account
        </button>
      </div>
    </div>
  );
};
