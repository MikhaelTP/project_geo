// src/components/map/SimpleMap.js
import React from 'react';
import { MapPin } from 'lucide-react';

const SimpleMap = ({ vehicles, selectedVehicle, onVehicleSelect, showAlerts }) => {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-green-100 via-blue-100 to-blue-200 rounded-lg overflow-hidden border-2 border-gray-200">
      {/* Simulación de calles y áreas de Lima */}
      <div className="absolute inset-0">
        {/* Costa (océano) */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-blue-400 to-blue-300"></div>
        
        {/* Calles principales simuladas */}
        <div className="absolute top-32 left-20 w-80 h-1 bg-gray-400"></div>
        <div className="absolute top-48 left-20 w-80 h-1 bg-gray-400"></div>
        <div className="absolute top-64 left-20 w-80 h-1 bg-gray-400"></div>
        
        <div className="absolute top-20 left-32 w-1 h-60 bg-gray-400"></div>
        <div className="absolute top-20 left-48 w-1 h-60 bg-gray-400"></div>
        <div className="absolute top-20 left-64 w-1 h-60 bg-gray-400"></div>
        
        {/* Áreas verdes (parques) */}
        <div className="absolute top-36 left-24 w-8 h-8 bg-green-400 rounded-full opacity-60"></div>
        <div className="absolute top-52 left-36 w-6 h-6 bg-green-400 rounded-full opacity-60"></div>
        <div className="absolute top-44 left-52 w-10 h-10 bg-green-400 rounded-full opacity-60"></div>
        
        {/* Etiquetas de zonas */}
        <div className="absolute top-24 left-24 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow">
          Miraflores
        </div>
        <div className="absolute top-40 left-40 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow">
          San Isidro
        </div>
        <div className="absolute top-56 left-28 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow">
          Barranco
        </div>
        <div className="absolute top-32 left-56 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow">
          La Victoria
        </div>
        
        {/* Centro de Lima */}
        <div className="absolute top-44 left-44 w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
        <div className="absolute top-48 left-40 text-xs font-bold text-red-700 bg-yellow-100 px-2 py-1 rounded shadow">
          Centro de Lima
        </div>
      </div>
      
      {/* Vehículos en el mapa */}
      {vehicles.map(vehicle => {
        const Icon = vehicle.icon;
        // Convertir coordenadas reales a posición en el mapa visual
        const mapX = ((vehicle.lng + 77.0428) * 600) + 100;
        const mapY = ((vehicle.lat + 12.0464) * 400) + 100;
        
        return (
          <div
            key={vehicle.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-125 ${
              selectedVehicle?.id === vehicle.id ? 'scale-150 z-30' : 'z-20'
            }`}
            style={{
              left: Math.max(30, Math.min(mapX, 380)),
              top: Math.max(30, Math.min(mapY, 350))
            }}
            onClick={() => onVehicleSelect(vehicle)}
          >
            <div className={`relative p-2 rounded-full shadow-lg border-2 border-white ${
              vehicle.color === 'blue' ? 'bg-blue-500' :
              vehicle.color === 'yellow' ? 'bg-yellow-500' :
              vehicle.color === 'green' ? 'bg-green-500' :
              'bg-orange-500'
            } text-white`}>
              <Icon className="w-4 h-4" />
              
              {/* Indicador de estado */}
              {vehicle.status === 'En ruta' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-white"></div>
              )}
              
              {/* Alerta de emergencia */}
              {showAlerts && vehicle.status === 'Emergencia' && (
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-75"></div>
              )}
              
              {/* Tooltip con información */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                {vehicle.plate} - {vehicle.speed} km/h
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Leyenda del mapa */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">Leyenda</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Camioneta de serenazgo Hilux</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Moto de serenazgo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Perro policía</span>
          </div>
        </div>
      </div>
      
      {/* Información del mapa */}
      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Miraflores, Lima, Perú</p>
            <p className="text-xs text-gray-500">{vehicles.length} vehículos activos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMap;