// src/pages/MapPage.js
import React, { useState } from 'react';
import { Globe, Eye, EyeOff, RefreshCw, Map, Satellite } from 'lucide-react';
// Importar el mapa real de Leaflet
import LeafletMirafloresMap from '../components/map/LeafletMirafloresMap';
// Mantener el mapa simulado como alternativa
import MirafloresMap from '../components/map/MirafloresMap';
import useVehicles from '../hooks/useVehicles';

const MapPage = ({ setSelectedVehicle }) => {
  const [mapView, setMapView] = useState('real'); // 'real' o 'simulated'
  const [showAlerts, setShowAlerts] = useState(true);
  const [selectedVehicle, setSelectedVehicleLocal] = useState(null);
  const { vehicles } = useVehicles();

  // Manejar selección de vehículo
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicleLocal(vehicle);
    setSelectedVehicle(vehicle);
  };

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
      {/* Controles del mapa */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Selector de tipo de mapa */}
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-gray-400" />
              <select 
                value={mapView} 
                onChange={(e) => setMapView(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="real">Mapa Real (OpenStreetMap)</option>
                <option value="simulated">Mapa Simulado</option>
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
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Mostrando {vehicles.length} vehículos en Miraflores
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">
                {mapView === 'real' ? 'Mapa Real' : 'Simulación'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Información del mapa seleccionado */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              {mapView === 'real' ? (
                <>
                  <Map className="w-5 h-5 mr-2 text-green-600" />
                  Mapa Real de Miraflores
                </>
              ) : (
                <>
                  <Satellite className="w-5 h-5 mr-2 text-blue-600" />
                  Mapa Simulado de Miraflores
                </>
              )}
            </h2>
            <p className="text-sm text-gray-500">
              {mapView === 'real' 
                ? 'Vista real con OpenStreetMap | Ubicación actual de todas las unidades municipales'
                : 'Vista simulada | Representación esquemática del distrito'
              }
            </p>
          </div>
          
          {/* Indicador de estado del mapa */}
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              {mapView === 'real' ? 'Conectado a OSM' : 'Modo Demo'}
            </span>
          </div>
        </div>
        
        {/* Renderizar el mapa según la selección */}
        {mapView === 'real' ? (
          <LeafletMirafloresMap 
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            onVehicleSelect={handleVehicleSelect}
            showAlerts={showAlerts}
          />
        ) : (
          <MirafloresMap 
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            onVehicleSelect={handleVehicleSelect}
            showAlerts={showAlerts}
            geofences={geofences}
            pointsOfInterest={pointsOfInterest}
          />
        )}
      </div>

      {/* Panel de información adicional */}
      {selectedVehicle && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Información del Vehículo Seleccionado
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Vehículo</p>
              <p className="font-semibold text-gray-900">{selectedVehicle.plate}</p>
              <p className="text-sm text-gray-500">{selectedVehicle.name}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Conductor</p>
              <p className="font-semibold text-gray-900">{selectedVehicle.driver}</p>
              <p className="text-sm text-gray-500">Estado: {selectedVehicle.status}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Métricas</p>
              <p className="font-semibold text-gray-900">{selectedVehicle.speed} km/h</p>
              <p className="text-sm text-gray-500">Combustible: {selectedVehicle.fuel}%</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
              Seguir Vehículo
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
              Ver Historial
            </button>
            <button 
              onClick={() => setSelectedVehicleLocal(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Instrucciones para el usuario */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          Instrucciones de uso del mapa
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Mapa Real:</strong> Usa datos reales de OpenStreetMap con calles y ubicaciones exactas</li>
          <li>• <strong>Mapa Simulado:</strong> Representación esquemática ideal para demostraciones</li>
          <li>• Haz clic en cualquier vehículo para ver información detallada</li>
          <li>• Usa los controles de zoom y centrado para navegar por el mapa</li>
          <li>• Los marcadores rojos muestran puntos de interés importantes del distrito</li>
        </ul>
      </div>
    </div>
  );
};

export default MapPage;