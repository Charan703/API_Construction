import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3,
  Calendar,
  Filter,
  Download,
  Wallet,
  Building2,
  HardHat,
  Truck,
  Box,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart as RePieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const flowData = [
  { month: 'Sep', inflow: 1200000, outflow: 800000 },
  { month: 'Oct', inflow: 1500000, outflow: 950000 },
  { month: 'Nov', inflow: 900000, outflow: 1100000 },
  { month: 'Dec', inflow: 1800000, outflow: 1400000 },
  { month: 'Jan', inflow: 2200000, outflow: 1600000 },
  { month: 'Feb', inflow: 1400000, outflow: 1250000 },
];

const allocationData = [
  { name: 'Materials', value: 450000, color: '#3b82f6' },
  { name: 'Labor', value: 320000, color: '#6366f1' },
  { name: 'Equipment Hire', value: 180000, color: '#8b5cf6' },
  { name: 'Site Services', value: 120000, color: '#ec4899' },
  { name: 'Permits & Legal', value: 85000, color: '#f59e0b' },
];

const transactions = [
  { id: 1, vendor: 'Steel Corp International', category: 'Materials', amount: 84200, status: 'Paid', date: 'Feb 10, 2026', type: 'out' },
  { id: 2, vendor: 'Blue Sky Excavations', category: 'Equipment Hire', amount: 12500, status: 'Processing', date: 'Feb 09, 2026', type: 'out' },
  { id: 3, vendor: 'Project Milestone A2', category: 'Inflow', amount: 450000, status: 'Received', date: 'Feb 08, 2026', type: 'in' },
  { id: 4, vendor: 'City Power & Water', category: 'Site Services', amount: 4800, status: 'Paid', date: 'Feb 05, 2026', type: 'out' },
  { id: 5, vendor: 'Concrete Solutions Ltd', category: 'Materials', amount: 32400, status: 'Overdue', date: 'Jan 28, 2026', type: 'out' },
];

export function ResourcesView() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Resource Allocation & Money Flow</h2>
          <p className="text-slate-500">Monitor budget distribution and project capital dynamics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Export Ledger
          </button>
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm">
            <Wallet className="w-4 h-4" />
            Manage Budget
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Budget', value: '$45.2M', sub: 'Allocated for Phase 2', icon: Building2, color: 'blue' },
          { label: 'Total Spent', value: '$18.4M', sub: '40.7% of total budget', icon: TrendingUp, color: 'indigo' },
          { label: 'Current Balance', value: '$2.8M', sub: 'Liquid site funds', icon: DollarSign, color: 'emerald' },
          { label: 'Unpaid Invoices', value: '$142K', sub: '3 invoices pending', icon: AlertCircle, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
              stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
              stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
              stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
              'bg-amber-50 text-amber-600'
            }`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Money Flow Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="font-bold text-slate-900">Capital Flow Trends</h4>
              <p className="text-xs text-slate-500 italic">Project Inflow vs Resource Expenditure (Monthly)</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Inflow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-200" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Outflow</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={flowData}>
                <defs>
                  <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="inflow" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorInflow)" />
                <Area type="monotone" dataKey="outflow" stroke="#c7d2fe" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-900 mb-6">Resource Allocation</h4>
          <div className="h-[220px] min-h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <RePieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {allocationData.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">${(item.value / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h4 className="font-bold text-slate-900">Recent Financial Activity</h4>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option>All Transactions</option>
                <option>Outflow Only</option>
                <option>Inflow Only</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-left">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Transaction Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        t.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {t.type === 'in' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-bold text-slate-900">{t.vendor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-500 px-2 py-1 bg-slate-100 rounded-md">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${t.type === 'in' ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {t.type === 'in' ? '+' : '-'}${t.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-500">{t.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      t.status === 'Paid' || t.status === 'Received' ? 'bg-emerald-50 text-emerald-700' :
                      t.status === 'Processing' ? 'bg-blue-50 text-blue-700' :
                      'bg-red-50 text-red-700 animate-pulse'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
          <button className="text-sm font-bold text-blue-600 hover:underline">View Full Statement</button>
        </div>
      </div>
    </div>
  );
}

