// src/components/routes/RouteCard.js
import React from 'react';

const RouteCard = ({ route, index }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">{route}</h3>
        <span className="text-xs text-gray-500">#{index + 1}</span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Vehículos asignados:</span>
          <span className="font-medium">{Math.floor(Math.random() * 5) + 1}</span>
        </div>
        <div className="flex justify-between">
          <span>Distancia:</span>
          <span className="font-medium">{(Math.random() * 50 + 10).toFixed(1)} km</span>
        </div>
        <div className="flex justify-between">
          <span>Tiempo promedio:</span>
          <span className="font-medium">{Math.floor(Math.random() * 60 + 30)} min</span>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="flex-1 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
          Editar
        </button>
        <button className="flex-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
          Ver en mapa
        </button>
      </div>
    </div>
  );
};

export default RouteCard;