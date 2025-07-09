// src/pages/AlertsPage.js
import React from 'react';
import AlertCards from '../components/alerts/AlertCard';
import AlertSettings from '../components/alerts/AlertSettings';
import AlertStats from '../components/alerts/AlertStats';
import 
{ RefreshCw } from 'lucide-react';

const AlertsPage = ({ notifications }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Centro de Alertas</h2>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              <RefreshCw className="w-4 h-4" />
              <span>Actualizar</span>
            </button>
            <span className="text-sm text-gray-500">{notifications.filter(n => !n.read).length} sin leer</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <AlertCards notifications={notifications} />
        </div>
        <div className="space-y-4">
          <AlertSettings />
          <AlertStats />
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;