// src/components/map/MirafloresMap.js
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Wifi, AlertTriangle, Hospital, Building, Car, Plus, Minus, Home, RotateCcw } from 'lucide-react';
import { FaMotorcycle } from 'react-icons/fa';

const MirafloresMap = ({ vehicles, selectedVehicle, onVehicleSelect, showAlerts, geofences = [], pointsOfInterest = [] }) => {
  const [mapCenter, setMapCenter] = useState({ lat: -12.1215, lng: -77.0285 }); // Centro de Miraflores
  const [zoom, setZoom] = useState(15);
  const [mapScale, setMapScale] = useState(1);

  // Coordenadas reales de landmarks de Miraflores
  const mirafloresLandmarks = [
    { name: 'Parque Kennedy', lat: -12.1210, lng: -77.0295, type: 'park', color: '#10B981' },
    { name: 'Larcomar', lat: -12.1320, lng: -77.0420, type: 'shopping', color: '#3B82F6' },
    { name: 'Malecón de Miraflores', lat: -12.1180, lng: -77.0350, type: 'waterfront', color: '#06B6D4' },
    { name: 'Municipalidad', lat: -12.1201, lng: -77.0282, type: 'government', color: '#DC2626' },
    { name: 'Parque del Amor', lat: -12.1270, lng: -77.0380, type: 'park', color: '#EC4899' },
    { name: 'Av. Pardo', lat: -12.1225, lng: -77.0275, type: 'avenue', color: '#6B7280' },
    { name: 'Av. Larco', lat: -12.1240, lng: -77.0300, type: 'avenue', color: '#6B7280' },
    { name: 'Ovalo Gutiérrez', lat: -12.1300, lng: -77.0250, type: 'plaza', color: '#F59E0B' },
    { name: 'Costa Verde', lat: -12.1150, lng: -77.0400, type: 'waterfront', color: '#06B6D4' }
  ];

  // Calles principales con coordenadas reales
  const streets = [
    { 
      name: 'Av. Pardo', 
      coords: [
        { lat: -12.1100, lng: -77.0275 }, 
        { lat: -12.1400, lng: -77.0275 }
      ],
      width: 4,
      color: '#4B5563'
    },
    { 
      name: 'Av. Larco', 
      coords: [
        { lat: -12.1120, lng: -77.0300 }, 
        { lat: -12.1380, lng: -77.0300 }
      ],
      width: 4,
      color: '#4B5563'
    },
    { 
      name: 'Av. Arequipa', 
      coords: [
        { lat: -12.1150, lng: -77.0250 }, 
        { lat: -12.1350, lng: -77.0250 }
      ],
      width: 3,
      color: '#4B5563'
    },
    { 
      name: 'Malecón de la Reserva', 
      coords: [
        { lat: -12.1120, lng: -77.0400 }, 
        { lat: -12.1380, lng: -77.0400 }
      ],
      width: 3,
      color: '#059669'
    },
    { 
      name: 'Av. Benavides', 
      coords: [
        { lat: -12.1300, lng: -77.0200 }, 
        { lat: -12.1300, lng: -77.0350 }
      ],
      width: 4,
      color: '#4B5563'
    }
  ];

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, 20));
    setMapScale(mapScale * 1.3);
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, 10));
    setMapScale(mapScale / 1.3);
  };

  const handleRecenter = () => {
    setZoom(15);
    setMapScale(1);
    setMapCenter({ lat: -12.1215, lng: -77.0285 });
  };

  // Convertir coordenadas geográficas a posición en píxeles
  const coordToPixel = (lat, lng) => {
    const baseX = 400;
    const baseY = 300;
    const scale = 8000 * mapScale;
    
    return {
      x: baseX + ((lng - mapCenter.lng) * scale),
      y: baseY + ((lat - mapCenter.lat) * scale)
    };
  };

  return (
    <div className="relative w-full h-[800px] bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 rounded-lg overflow-hidden border border-gray-300 shadow-lg">
      
      {/* Fondo del océano Pacífico */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-400 via-blue-300 to-transparent opacity-40"></div>
      
      {/* Zona urbana de Lima */}
      <div className="absolute left-0 top-0 w-2/3 h-full bg-gradient-to-r from-green-100 via-gray-100 to-transparent opacity-30"></div>

      {/* Dibujar calles con SVG para mayor precisión */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {streets.map((street, index) => {
          const start = coordToPixel(street.coords[0].lat, street.coords[0].lng);
          const end = coordToPixel(street.coords[1].lat, street.coords[1].lng);
          
          return (
            <g key={index}>
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={street.color}
                strokeWidth={street.width}
                opacity="0.8"
              />
              {/* Etiqueta de calle */}
              <text
                x={(start.x + end.x) / 2}
                y={(start.y + end.y) / 2 - 10}
                fill="#374151"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                className="pointer-events-none"
              >
                {street.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Landmarks y puntos de interés */}
      {mirafloresLandmarks.map((landmark, index) => {
        const position = coordToPixel(landmark.lat, landmark.lng);
        
        if (position.x < 0 || position.x > 800 || position.y < 0 || position.y > 800) return null;
        
        return (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`
            }}
          >
            <div 
              className="p-2 rounded-full shadow-md border-2 border-white hover:scale-110 transition-transform"
              style={{ backgroundColor: landmark.color }}
            >
              {landmark.type === 'park' && <Home className="w-3 h-3 text-white" />}
              {landmark.type === 'shopping' && <Building className="w-3 h-3 text-white" />}
              {landmark.type === 'waterfront' && <MapPin className="w-3 h-3 text-white" />}
              {landmark.type === 'government' && <Building className="w-3 h-3 text-white" />}
              {landmark.type === 'avenue' && <Navigation className="w-3 h-3 text-white" />}
              {landmark.type === 'plaza' && <MapPin className="w-3 h-3 text-white" />}
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-30">
              {landmark.name}
            </div>
          </div>
        );
      })}

      {/* Puntos de interés adicionales */}
      {pointsOfInterest.map((poi, index) => {
        const position = coordToPixel(poi.lat, poi.lng);
        
        if (position.x < 0 || position.x > 800 || position.y < 0 || position.y > 800) return null;
        
        return (
          <div
            key={`poi-${index}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-25"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`
            }}
          >
            <div className="p-2 bg-red-600 rounded-full shadow-lg border-2 border-white">
              {poi.type === 'hospital' && <Hospital className="w-4 h-4 text-white" />}
              {poi.type === 'police' && <AlertTriangle className="w-4 h-4 text-white" />}
              {poi.type === 'gas_station' && <Building className="w-4 h-4 text-white" />}
              {poi.type === 'school' && <Building className="w-4 h-4 text-white" />}
              {poi.type === 'bank' && <Building className="w-4 h-4 text-white" />}
            </div>
            
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-30">
              {poi.name}
            </div>
          </div>
        );
      })}

      {/* Geo cercas */}
      {geofences.map((geofence, index) => {
        if (!geofence.active) return null;
        
        const position = coordToPixel(geofence.center.lat, geofence.center.lng);
        const radiusPixels = (geofence.radius / 100) * mapScale;
        
        return (
          <div
            key={`geofence-${index}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-none"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`
            }}
          >
            <div
              className="rounded-full border-2 border-dashed opacity-60"
              style={{
                width: `${radiusPixels * 2}px`,
                height: `${radiusPixels * 2}px`,
                borderColor: geofence.color,
                backgroundColor: `${geofence.color}20`
              }}
            />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-xs font-medium text-gray-700">
              {geofence.name}
            </div>
          </div>
        );
      })}

      {/* Vehículos en el mapa */}
      {vehicles.map(vehicle => {
        const position = coordToPixel(vehicle.lat, vehicle.lng);
        const Icon = vehicle.icon;
        
        if (position.x < 0 || position.x > 800 || position.y < 0 || position.y > 800) return null;

        return (
          <div
            key={vehicle.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-125 ${
              selectedVehicle?.id === vehicle.id ? 'scale-150 z-50' : 'z-40'
            }`}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: `translate(-50%, -50%) rotate(${vehicle.direction || 0}deg)`
            }}
            onClick={() => onVehicleSelect(vehicle)}
          >
            <div className={`relative p-3 rounded-full shadow-lg border-2 border-white`} style={{ backgroundColor: vehicle.color }}>
              <Icon className="w-5 h-5 text-white" />
              
              {/* Indicador de estado */}
              {vehicle.status === 'En ruta' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-white"></div>
              )}
              
              {/* Alerta de emergencia */}
              {showAlerts && vehicle.status === 'Emergencia' && (
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-75"></div>
              )}
              
              {/* Trail de movimiento */}
              {vehicle.status === 'En ruta' && (
                <div 
                  className="absolute w-8 h-1 bg-white opacity-60 rounded-full"
                  style={{
                    left: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    animation: 'fade 2s infinite'
                  }}
                />
              )}
            </div>

            {/* Tooltip con información del vehículo */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg">
              <div className="font-semibold">{vehicle.plate}</div>
              <div>{vehicle.driver}</div>
              <div>{vehicle.speed} km/h • {vehicle.fuel}% combustible</div>
              <div className="text-gray-300">{vehicle.status}</div>
            </div>
          </div>
        );
      })}

      {/* Panel de información del mapa */}
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg z-50 border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Distrito de Miraflores</p>
            <p className="text-xs text-gray-500">Lima, Perú - Zoom: {zoom}</p>
            <p className="text-xs text-gray-500">{vehicles.length} unidades • Última actualización: {new Date().toLocaleTimeString()}</p>
            <div className="flex items-center space-x-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Sistema Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controles del mapa */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-50">
        <button 
          onClick={handleRecenter} 
          className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors border" 
          title="Centrar mapa"
        >
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={handleZoomIn} 
          className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors border" 
          title="Acercar"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={handleZoomOut} 
          className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors border" 
          title="Alejar"
        >
          <Minus className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Leyenda del mapa mejorada */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-xs z-50 border">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          Leyenda del Sistema
        </h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Car className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-600">Camioneta Serenazgo</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaMotorcycle className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-gray-600">Moto Serenazgo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Unidad Canina</span>
          </div>
          <div className="flex items-center space-x-2">
            <Hospital className="w-4 h-4 text-red-500" />
            <span className="text-xs text-gray-600">Servicios de Emergencia</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">En movimiento</span>
          </div>
        </div>
        
        {/* Mini estadísticas */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-green-600">{vehicles.filter(v => v.status === 'En ruta').length}</div>
              <div className="text-gray-500">En ruta</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-red-600">{vehicles.filter(v => v.status === 'Detenido').length}</div>
              <div className="text-gray-500">Detenidos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Escala del mapa */}
      <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-lg z-50 border">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-1 bg-gray-700"></div>
          <span className="text-xs text-gray-600">{Math.round(500 / mapScale)}m</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

export default MirafloresMap;