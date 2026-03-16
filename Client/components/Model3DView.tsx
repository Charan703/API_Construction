import React from 'react';
import { Building2 } from 'lucide-react';

export function Model3DView() {
  const viewerUrl = `${import.meta.env.BASE_URL}3d-viewer.html`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            3D Building Model
          </h2>
          <p className="text-slate-600 mt-1">Victorian Townhouse - Advanced Interactive 3D Visualization</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <iframe
          src={viewerUrl}
          className="w-full h-[700px] border-0"
          title="3D Building Model"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-2">Building Type</h3>
          <div className="space-y-1 text-sm">
            <p className="text-slate-600">Style: <span className="font-medium text-slate-900">Victorian Townhouse</span></p>
            <p className="text-slate-600">Floors: <span className="font-medium text-slate-900">3 + Attic</span></p>
            <p className="text-slate-600">Height: <span className="font-medium text-slate-900">10.5m</span></p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-2">UK Features</h3>
          <div className="space-y-1 text-sm">
            <p className="text-slate-600">• Bay Window</p>
            <p className="text-slate-600">• Sash Windows</p>
            <p className="text-slate-600">• Chimney Stacks</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-2">Materials</h3>
          <div className="space-y-1 text-sm">
            <p className="text-slate-600">Brick: <span className="font-medium text-slate-900">Red Clay</span></p>
            <p className="text-slate-600">Roof: <span className="font-medium text-slate-900">Slate Tiles</span></p>
            <p className="text-slate-600">Windows: <span className="font-medium text-slate-900">UPVC</span></p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-2">Progress</h3>
          <div className="space-y-1 text-sm">
            <p className="text-slate-600">Foundation: <span className="font-medium text-green-600">100%</span></p>
            <p className="text-slate-600">Structure: <span className="font-medium text-blue-600">85%</span></p>
            <p className="text-slate-600">Finishing: <span className="font-medium text-orange-600">45%</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
