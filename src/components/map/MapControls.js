// src/components/map/MapControls.js
import React from 'react';
import { Globe, Eye, EyeOff, RefreshCw } from 'lucide-react';

const MapControls = ({ mapView, setMapView, showAlerts, setShowAlerts, vehicleCount }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-gray-400" />
            <select 
              value={mapView} 
              onChange={(e) => setMapView(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="satellite">Satélite</option>
              <option value="hybrid">Híbrido</option>
              <option value="terrain">Terreno</option>
              <option value="roadmap">Mapa</option>
            </select>
          </div>
          <button 
            onClick={() => setShowAlerts(!showAlerts)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm ${
              showAlerts ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {showAlerts ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>Alertas</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1 rounded-md text-sm bg-green-100 text-green-700 hover:bg-green-200">
            <RefreshCw className="w-4 h-4" />
            <span>Actualizar</span>
          </button>
        </div>
        <div className="text-sm text-gray-500">
          Mostrando {vehicleCount} vehículos
        </div>
      </div>
    </div>
  );
};

export default MapControls;