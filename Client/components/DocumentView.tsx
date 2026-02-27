import React, { useState, useEffect } from 'react';
import { PageHeader } from './PageHeader';
import { FileText, Search, Plus, Filter, MoreVertical, Download, ExternalLink } from 'lucide-react';
import { api } from '../../src/api';

export function DocumentsView() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    api.getDocuments().then(setDocuments).catch(() => {});
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        api.uploadDocument(file, 'General', '1').then(() => {
          loadDocuments();
          alert('Document uploaded successfully!');
        });
      }
    };
    input.click();
  };

  const handleDownload = (doc: any) => {
    alert(`Downloading: ${doc.name}`);
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this document?')) {
      api.deleteDocument(id).then(loadDocuments);
    }
  };

  const filtered = documents.filter(d => 
    d.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Project Documents" 
        description="Access all blueprints, permits, and site reports"
        actions={
          <button onClick={handleUpload} className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Upload New
          </button>
        }
      />

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-slate-50 rounded-lg text-sm hover:bg-slate-100 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Modified</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    {doc.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{doc.size}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{doc.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDownload(doc)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(doc.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
