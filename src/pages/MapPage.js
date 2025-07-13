// src/pages/MapPage.js
import React, { useState } from 'react';
import { Globe, Eye, EyeOff, RefreshCw } from 'lucide-react';
import MirafloresMap from '../components/map/MirafloresMap';
import useVehicles from '../hooks/useVehicles';

const MapPage = ({ setSelectedVehicle }) => {
  const [mapView, setMapView] = useState('hybrid');
  const [showAlerts, setShowAlerts] = useState(true);
  const { vehicles } = useVehicles();

  // Datos simulados para geo cercas y puntos de interés
  const geofences = [
    {
      id: 1,
      name: 'Zona Segura - Parque Central',
      type: 'safe',
      center: { lat: -12.1215, lng: -77.0285 },
      radius: 200,
      color: '#10B981',
      active: true
    },
    {
      id: 2,
      name: 'Zona Restringida - Malecón',
      type: 'restricted',
      center: { lat: -12.1180, lng: -77.0320 },
      radius: 150,
      color: '#EF4444',
      active: true
    }
  ];

  const pointsOfInterest = [
    {
      id: 1,
      name: 'Hospital Nacional',
      type: 'hospital',
      icon: 'hospital',
      lat: -12.1200,
      lng: -77.0290
    },
    {
      id: 2,
      name: 'Comisaría de Miraflores',
      type: 'police',
      icon: 'police',
      lat: -12.1210,
      lng: -77.0280
    },
    {
      id: 3,
      name: 'Grifo Petroperú',
      type: 'gas_station',
      icon: 'gas',
      lat: -12.1250,
      lng: -77.0300
    }
  ];

  return (
    <div className="space-y-4">
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
            Mostrando {vehicles.length} vehículos en Miraflores
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Mapa de Miraflores en Tiempo Real</h2>
          <p className="text-sm text-gray-500">Vista: {mapView} | Ubicación actual de todas las unidades municipales</p>
        </div>
        
        <MirafloresMap 
          vehicles={vehicles}
          selectedVehicle={null}
          onVehicleSelect={setSelectedVehicle}
          showAlerts={showAlerts}
          geofences={geofences}
          pointsOfInterest={pointsOfInterest}
        />
      </div>
    </div>
  );
};

export default MapPage;