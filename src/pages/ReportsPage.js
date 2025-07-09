// src/pages/ReportsPage.js
import React from 'react';
import { FileText } from 'lucide-react';
import ReportsTable from '../components/reports/ReportsTable';

const ReportsPage = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Reportes Generados</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <FileText className="w-4 h-4" />
            <span>Nuevo Reporte</span>
          </button>
        </div>
      </div>
      <ReportsTable />
    </div>
  );
};

export default ReportsPage;