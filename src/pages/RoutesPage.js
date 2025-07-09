// src/pages/RoutesPage.js
import React from 'react';
import { Route } from 'lucide-react';
import RoutesGrid from '../components/routes/RoutesGrid';

const RoutesPage = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Gestión de Rutas</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Route className="w-4 h-4" />
            <span>Nueva Ruta</span>
          </button>
        </div>
      </div>
      <RoutesGrid />
    </div>
  );
};

export default RoutesPage;