import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Wifi, AlertTriangle, Hospital, Building, Car } from 'lucide-react';

const MirafloresMap = ({ vehicles, selectedVehicle, onVehicleSelect, showAlerts, geofences = [], pointsOfInterest = [] }) => {
  const [mapCenter, setMapCenter] = useState({ lat: -12.1215, lng: -77.0285 }); // Centro de Miraflores
  const [zoom, setZoom] = useState(15);
  const [mapScale, setMapScale] = useState(1);

  // Coordenadas específicas de Miraflores expandidas
  const mirafloresLandmarks = [
    { name: 'Parque Central', lat: -12.1215, lng: -77.0285, type: 'park' },
    { name: 'Malecón de Miraflores', lat: -12.1180, lng: -77.0320, type: 'waterfront' },
    { name: 'Av. Pardo', lat: -12.1225, lng: -77.0275, type: 'avenue' },
    { name: 'Larcomar', lat: -12.1320, lng: -77.0420, type: 'shopping' },
    { name: 'Parque del Amor', lat: -12.1270, lng: -77.0380, type: 'park' },
    { name: 'Municipalidad', lat: -12.1201, lng: -77.0282, type: 'government' },
    { name: 'Av. Larco', lat: -12.1240, lng: -77.0300, type: 'avenue' },
    { name: 'Plaza de Armas', lat: -12.1200, lng: -77.0290, type: 'plaza' },
    { name: 'Ovalo Gutiérrez', lat: -12.1300, lng: -77.0250, type: 'plaza' },
    { name: 'Parque Salazar', lat: -12.1280, lng: -77.0350, type: 'park' },
    { name: 'Av. Benavides', lat: -12.1350, lng: -77.0280, type: 'avenue' },
    { name: 'Kennedy Park', lat: -12.1210, lng: -77.0295, type: 'park' }
  ];

  // Calles principales de Miraflores expandidas
  const streets = [
    { name: 'Av. Pardo', coords: [{ lat: -12.1100, lng: -77.0275 }, { lat: -12.1400, lng: -77.0275 }] },
    { name: 'Av. Larco', coords: [{ lat: -12.1120, lng: -77.0300 }, { lat: -12.1380, lng: -77.0300 }] },
    { name: 'Av. Arequipa', coords: [{ lat: -12.1150, lng: -77.0250 }, { lat: -12.1350, lng: -77.0250 }] },
    { name: 'Malecón', coords: [{ lat: -12.1120, lng: -77.0400 }, { lat: -12.1380, lng: -77.0400 }] },
    { name: 'Av. Benavides', coords: [{ lat: -12.1300, lng: -77.0200 }, { lat: -12.1300, lng: -77.0350 }] },
    { name: 'Av. Diagonal', coords: [{ lat: -12.1180, lng: -77.0260 }, { lat: -12.1320, lng: -77.0340 }] }
  ];

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, 20));
    setMapScale(mapScale * 1.2);
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, 10));
    setMapScale(mapScale / 1.2);
  };

  const handleRecenter = () => {
    setZoom(15);
    setMapScale(1);
    setMapCenter({ lat: -12.1215, lng: -77.0285 });
  };

  return (
    <div className="relative w-full h-[800px] bg-gradient-to-br from-green-50 via-blue-50 to-blue-100 rounded-lg overflow-hidden border-2 border-gray-200">
      {/* Fondo del océano Pacífico */}
      <div className="absolute right-0 top-0 w-48 h-full bg-gradient-to-l from-blue-400 to-blue-300 opacity-80"></div>
      
      {/* Zona de Lima Sur (más verde) */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-green-200 to-green-100 opacity-60"></div>

      {/* Dibujar calles principales */}
      {streets.map((street, index) => (
        <div key={index}>
          {/* Línea de calle simulada */}
          <div
            className="absolute bg-gray-600 opacity-70 z-10"
            style={{
              left: `${((street.coords[0].lng + 77.0500) * 1000 * mapScale) + 80}px`,
              top: `${((street.coords[0].lat + 12.1600) * 1000 * mapScale) + 80}px`,
              width: street.name.includes('Av.') ? '6px' : '4px',
              height: street.name === 'Av. Benavides' ? `${Math.abs(street.coords[1].lng - street.coords[0].lng) * 5000 * mapScale}px` : `${Math.abs(street.coords[1].lat - street.coords[0].lat) * 5000 * mapScale}px`,
              transform: street.name === 'Malecón' ? 'rotate(90deg)' :
                        street.name === 'Av. Benavides' ? 'rotate(90deg)' :
                        street.name === 'Av. Diagonal' ? 'rotate(45deg)' : 'rotate(0deg)',
              transformOrigin: 'top left'
            }}
          />

          {/* Etiqueta de calle */}
          <div
            className="absolute text-xs font-semibold text-gray-800 bg-white px-2 py-1 rounded shadow-sm z-20"
            style={{
              left: `${((street.coords[0].lng + 77.0500) * 1000 * mapScale) + 90}px`,
              top: `${((street.coords[0].lat + 12.1600) * 1000 * mapScale) + 90}px`
            }}
          >
            {street.name}
          </div>
        </div>
      ))}

      {/* Landmarks de Miraflores */}
      {mirafloresLandmarks.map((landmark, index) => (
        <div
          key={index}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
          style={{
            left: `${((landmark.lng + 77.0500) * 1000 * mapScale) + 100}px`,
            top: `${((landmark.lat + 12.1600) * 1000 * mapScale) + 100}px`
          }}
        >
          <div className={`p-2 rounded-full shadow-lg border-2 border-white ${landmark.type === 'park' ? 'bg-green-500' : landmark.type === 'waterfront' ? 'bg-blue-500' : 'bg-gray-500'}`}>
            <MapPin className="w-4 h-4 text-white" />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
            {landmark.name}
          </div>
        </div>
      ))}

      {/* Vehículos en el mapa */}
      {vehicles.map(vehicle => {
        const Icon = vehicle.icon;
        const mapX = ((vehicle.lng + 77.0500) * 1000 * mapScale) + 100;
        const mapY = ((vehicle.lat + 12.1600) * 1000 * mapScale) + 100;

        return (
          <div
            key={vehicle.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-125 ${selectedVehicle?.id === vehicle.id ? 'scale-150 z-50' : 'z-40'}`}
            style={{
              left: `${Math.max(50, Math.min(mapX, 950))}px`,
              top: `${Math.max(50, Math.min(mapY, 750))}px`
            }}
            onClick={() => onVehicleSelect(vehicle)}
          >
            <div className={`relative p-3 rounded-full shadow-lg border-2 border-white ${vehicle.color === 'blue' ? 'bg-blue-500' : vehicle.color === 'yellow' ? 'bg-yellow-500' : vehicle.color === 'green' ? 'bg-green-500' : 'bg-orange-500'}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}

      {/* Información del mapa */}
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg z-50">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Distrito de Miraflores</p>
            <p className="text-xs text-gray-500">Lima, Perú - Zoom: {zoom}</p>
            <p className="text-xs text-gray-500">{vehicles.length} unidades activas</p>
          </div>
        </div>
      </div>

      {/* Controles del mapa funcionales */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-50">
        <button onClick={handleRecenter} className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors" title="Centrar mapa">
          <Navigation className="w-5 h-5 text-gray-600" />
        </button>
        <button onClick={handleZoomIn} className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors" title="Acercar">
          <span className="text-lg font-bold text-gray-600">+</span>
        </button>
        <button onClick={handleZoomOut} className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors" title="Alejar">
          <span className="text-lg font-bold text-gray-600">-</span>
        </button>
      </div>

      {/* Leyenda del mapa */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-xs z-50">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Leyenda</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Camioneta Serenazgo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Moto Serenazgo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Unidad Canina</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MirafloresMap;
